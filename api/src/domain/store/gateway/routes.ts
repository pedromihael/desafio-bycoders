import { StoreController } from "@domain/store/controller/StoreController"

export const StoreRoutes = [{
    method: "get",
    route: "/stores",
    controller: StoreController,
    action: "all"
}, {
    method: "get",
    route: "/stores/name",
    controller: StoreController,
    action: "oneByName"
}, {
    method: "get",
    route: "/stores/:id",
    controller: StoreController,
    action: "one"
}, {
    method: "post",
    route: "/stores",
    controller: StoreController,
    action: "save"
}, {
    method: "delete",
    route: "/stores/:id",
    controller: StoreController,
    action: "remove"
}]