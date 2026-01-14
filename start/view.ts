import edge from "edge.js";

edge.global("formatOrderDate", (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
})

edge.global("formatOrderStatus", (status: string): string => {
  switch (status) {
    case "FULFILLED":
      return "On its way"

    case "PARTIALLY_FULFILLED":
      return "Partially shipped"

    case "IN_PROGRESS":
    case "PENDING_FULFILLMENT":
      return "Preparing shipment"

    case "SCHEDULED":
      return "Scheduled for shipment"

    case "ON_HOLD":
      return "On hold"

    case "RESTOCKED":
      return "Cancelled & restocked"

    case "OPEN":
    case "UNFULFILLED":
      return "Confirmed"

    default:
      return "Order received"
  }
})


edge.global("json", (obj: any) => {
  return JSON.stringify(obj);
})

edge.global("hasDiscount", (priceAmount: number, compareAtAmount: number | null | undefined): boolean => {
  if (!compareAtAmount) return false;
  return compareAtAmount > priceAmount;
}
);

edge.global("sanitizeShopifyId", (id: string): string => {
  const parts = id.split("/");
  return parts[parts.length - 1];
})

edge.global("getPriorityCollections", (collections: any): any[] => {
  const priorityHandles = ['monitors', 'scanners', 'thermal-printers', 'hp-lenovo-docking-stations'];
  const result: any[] = [];
  
  priorityHandles.forEach(handle => {
    const collection = collections.edges.find((e: any) => e.node.handle === handle);
    if (collection) {
      result.push(collection.node);
    }
  });
  
  return result;
})

edge.global("getDropdownCollections", (collections: any): any[] => {
  const priorityHandles = ['monitors', 'scanners', 'thermal-printers', 'hp-lenovo-docking-stations'];
  
  return collections.edges
    .filter((e: any) => !priorityHandles.includes(e.node.handle) && e.node.handle !== 'all')
    .map((e: any) => e.node);
})

edge.global("getAllCollection", (collections: any): any | null => {
  const collection = collections.edges.find((e: any) => e.node.handle === 'all');
  return collection ? collection.node : null;
})
