interface MetafieldReferenceImage {
    url?: string
    altText?: string
}

interface MetafieldReference {
    key: string
    value: string
    reference?: MetafieldReferenceImage
}

interface Metafield {
    key: string
    value: object | string
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
