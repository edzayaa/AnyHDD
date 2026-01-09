export interface MetafieldReferenceImage {
    id?: string
    url?: string
    altText?: string | null
    image?: {
        url?: string
        altText?: string | null
    }
}

export interface MetafieldReference {
    key: string
    value: string | null
    reference?: MetafieldReferenceImage | null
    references?: {
        edges: Array<{
            node: {
                fields: MetafieldReference[]
            }
        }>
    }
}

export interface Metafield {
    key: string
    value: object | string
    reference?: {
        fields?: MetafieldReference[]
    } | null
    references?: {
        edges: Array<{
            node: {
                fields: MetafieldReference[]
            }
        }>
    }
}

interface CustomFieldValue {
    value: string
    references?: Array<Record<string, string>>
}

interface CustomFields {
    [key: string]: string | CustomFieldValue
}

export function processMetafields(metafields: Metafield[] | null | undefined): CustomFields {
    if (!metafields || !Array.isArray(metafields)) {
        return {}
    }

    return metafields.reduce((acc, field) => {
        if (field && field.key && field.value !== undefined) {
            const value = typeof field.value === 'string'
                ? field.value
                : JSON.stringify(field.value)

            if (field.references?.edges && field.references.edges.length > 0) {
                const references = field.references.edges.map(edge => {
                    return edge.node.fields.reduce((refAcc, refField) => {
                        refAcc[refField.key] = refField.value
                        
                        if (refField.reference) {
                            refAcc[`${refField.key}_data`] = refField.reference
                        }
                        
                        return refAcc
                    }, {} as Record<string, any>)
                })

                acc[field.key] = {
                    value,
                    references
                }
            } else {
                acc[field.key] = value
            }
        }
        return acc
    }, {} as CustomFields)
}

export type ConnectivityPayload = Record<string, any>

function normalizeMetafieldValue(value: object | string | null | undefined): string | null {
    if (value === null || value === undefined) {
        return null
    }

    if (typeof value === 'string') {
        const trimmed = value.trim()
        return trimmed.length > 0 ? trimmed : null
    }

    try {
        return JSON.stringify(value)
    } catch (error) {
        return String(value)
    }
}

function isGraphqlId(value: string | null): boolean {
    return typeof value === 'string' && value.startsWith('gid://')
}

function parseJsonArrayValue(rawValue: unknown): string[] | null {
    if (typeof rawValue !== 'string') {
        return null
    }

    const trimmed = rawValue.trim()

    if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
        return null
    }

    try {
        const parsed = JSON.parse(trimmed)

        if (!Array.isArray(parsed)) {
            return null
        }

        const entries = parsed
            .map(item => (typeof item === 'string' ? item.trim() : null))
            .filter((item): item is string => Boolean(item))

        return entries.length > 0 ? entries : null
    } catch (error) {
        return null
    }
}

function sanitizeFieldReference(reference: MetafieldReferenceImage | null | undefined) {
    if (!reference) {
        return null
    }

    const image = reference.image ?? (reference.url || reference.altText
        ? { url: reference.url, altText: reference.altText ?? null }
        : null)

    if (!image) {
        return reference
    }

    return {
        id: reference.id ?? null,
        image: {
            url: image.url ?? null,
            altText: image.altText ?? null
        }
    }
}

function sanitizeMetaobjectFields(fields: MetafieldReference[] | undefined): ConnectivityPayload {
    if (!fields || fields.length === 0) {
        return {}
    }

    return fields.reduce((acc, field) => {
        if (!field || !field.key) {
            return acc
        }

        const normalizedValue = normalizeMetafieldValue(field.value ?? null)
        const compatibilityArray = field.key === 'compatibility' ? parseJsonArrayValue(field.value ?? null) : null
        const baseValue = compatibilityArray ?? normalizedValue
        const hasReference = Boolean(field.reference)
        const nestedEdges = field.references?.edges ?? []
        const hasNestedReferences = nestedEdges.length > 0

        if (!hasReference && !hasNestedReferences) {
            acc[field.key] = baseValue
            return acc
        }

        const entry: Record<string, any> = {}

        const canUseValue = baseValue !== null && !(typeof baseValue === 'string' && isGraphqlId(baseValue))

        if (canUseValue) {
            entry.value = baseValue
        }

        if (hasReference) {
            const sanitizedReference = sanitizeFieldReference(field.reference ?? null)
            if (sanitizedReference) {
                entry.reference = sanitizedReference
            }
        }

        if (hasNestedReferences) {
            entry.references = nestedEdges
                .filter(edge => edge?.node?.fields)
                .map(edge => sanitizeMetaobjectFields(edge.node.fields))
        }

        if (entry.reference && !Object.prototype.hasOwnProperty.call(entry, 'value') && !entry.references) {
            acc[field.key] = entry.reference
        } else if (entry.references && !Object.prototype.hasOwnProperty.call(entry, 'value') && !entry.reference) {
            acc[field.key] = entry.references
        } else {
            acc[field.key] = entry
        }

        return acc
    }, {} as ConnectivityPayload)
}

export function processConnectivityMetafields(metafields: Metafield[] | null | undefined): ConnectivityPayload | null {
    if (!Array.isArray(metafields)) {
        return null
    }

    const connectivityField = metafields.find(field => field?.key === 'connectivity_options')

    if (!connectivityField?.reference?.fields) {
        return null
    }

    const connectivityData = sanitizeMetaobjectFields(connectivityField.reference.fields)

    const additionalReferences = connectivityField.references?.edges
        ?.filter(edge => edge?.node?.fields)
        .map(edge => sanitizeMetaobjectFields(edge.node.fields)) ?? []

    if (additionalReferences.length > 0) {
        connectivityData.metaReferences = additionalReferences
    }

    return Object.keys(connectivityData).length > 0 ? connectivityData : null
}