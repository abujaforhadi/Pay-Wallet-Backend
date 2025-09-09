"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const transaction_routes_1 = __importDefault(require("../modules/transaction/transaction.routes"));
const wallet_routes_1 = __importDefault(require("../modules/wallet/wallet.routes"));
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        router: user_route_1.userRoutes,
    },
    {
        path: "/auth",
        router: auth_route_1.AuthRoutes,
    },
    {
        path: "/transaction",
        router: transaction_routes_1.default,
    },
    {
        path: "/wallet",
        router: wallet_routes_1.default,
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.router);
});
