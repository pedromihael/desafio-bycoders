import { OwnerController } from "@domain/owner/controller/OwnerController"

export const OwnerRoutes = [{
    method: "get",
    route: "/owners",
    controller: OwnerController,
    action: "all"
}, {
    method: "get",
    route: "/owners/name/",
    controller: OwnerController,
    action: "oneByName"
}, {
    method: "get",
    route: "/owners/:id",
    controller: OwnerController,
    action: "one"
}, {
    method: "post",
    route: "/owners",
    controller: OwnerController,
    action: "save"
}, {
    method: "delete",
    route: "/owners/:id",
    controller: OwnerController,
    action: "remove"
}]