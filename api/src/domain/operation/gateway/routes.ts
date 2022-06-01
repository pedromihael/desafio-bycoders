import { OperationController } from "@domain/operation/controller/OperationController"

export const OperationRoutes = [{
    method: "get",
    route: "/operations",
    controller: OperationController,
    action: "all"
}, {
    method: "get",
    route: "/operations/:id",
    controller: OperationController,
    action: "one"
}, {
    method: "get",
    route: "/operations/type/:type",
    controller: OperationController,
    action: "oneByType"
}, {
    method: "post",
    route: "/operations",
    controller: OperationController,
    action: "save"
}, {
    method: "delete",
    route: "/operations/:id",
    controller: OperationController,
    action: "remove"
}]