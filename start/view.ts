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