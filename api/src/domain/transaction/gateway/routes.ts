import { TransactionController } from "@domain/transaction/controller/TransactionController"

export const TransactionRoutes = [{
    method: "get",
    route: "/transactions",
    controller: TransactionController,
    action: "all"
}, {
    method: "get",
    route: "/transactions/store",
    controller: TransactionController,
    action: "listByStore"
}, {
    method: "get",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "one"
}, {
    method: "post",
    route: "/transactions",
    controller: TransactionController,
    action: "save"
}, {
    method: "delete",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "remove"
}]