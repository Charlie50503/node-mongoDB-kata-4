"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var headers_1 = __importDefault(require("./headers/headers"));
var handle_1 = require("./handle/handle");
var todo_1 = __importDefault(require("./models/todo"));
dotenv_1.default.config({
    path: "config.env"
});
var requestListener = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, title, postResult, error_1, deleteResult, error_2, id, _b, title, patchResult, error_3, deleteResult, error_4;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (req.url === "/todos" && req.method === "OPTIONS") {
                    res.writeHead(200, headers_1.default);
                    res.write(JSON.stringify({
                        "status": "success",
                    }));
                    res.end();
                    return [2 /*return*/];
                }
                body = "";
                req.on("data", function (chunk) {
                    body += chunk;
                });
                return [4 /*yield*/, new Promise(function (resolve) {
                        req.on("end", resolve);
                    })];
            case 1:
                _d.sent();
                if (!(req.url === "/todos")) return [3 /*break*/, 13];
                _a = req.method;
                switch (_a) {
                    case "GET": return [3 /*break*/, 2];
                    case "POST": return [3 /*break*/, 3];
                    case "DELETE": return [3 /*break*/, 7];
                }
                return [3 /*break*/, 11];
            case 2:
                (0, handle_1.successHandle)(req, res);
                return [3 /*break*/, 12];
            case 3:
                _d.trys.push([3, 5, , 6]);
                title = JSON.parse(body).title;
                if (!title)
                    (0, handle_1.errorHandle)(req, res, "格式錯誤");
                return [4 /*yield*/, todo_1.default.create({ title: title })];
            case 4:
                postResult = _d.sent();
                if (postResult)
                    (0, handle_1.successHandle)(req, res);
                if (!postResult)
                    (0, handle_1.errorHandle)(req, res, "格式錯誤");
                return [3 /*break*/, 6];
            case 5:
                error_1 = _d.sent();
                (0, handle_1.errorHandle)(req, res, "格式錯誤");
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 12];
            case 7:
                _d.trys.push([7, 9, , 10]);
                return [4 /*yield*/, todo_1.default.deleteMany({})];
            case 8:
                deleteResult = _d.sent();
                if (!deleteResult)
                    (0, handle_1.errorHandle)(req, res, "格式錯誤");
                if (deleteResult)
                    (0, handle_1.successHandle)(req, res);
                return [3 /*break*/, 10];
            case 9:
                error_2 = _d.sent();
                (0, handle_1.errorHandle)(req, res, "格式錯誤");
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                (0, handle_1.errorHandle)(req, res, "路由錯誤");
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
            case 13:
                if (!((_c = req.url) === null || _c === void 0 ? void 0 : _c.startsWith("/todos/"))) return [3 /*break*/, 24];
                id = req.url.split("/").pop();
                _b = req.method;
                switch (_b) {
                    case "PATCH": return [3 /*break*/, 14];
                    case "DELETE": return [3 /*break*/, 18];
                }
                return [3 /*break*/, 22];
            case 14:
                _d.trys.push([14, 16, , 17]);
                title = JSON.parse(body).title;
                if (!title)
                    (0, handle_1.errorHandle)(req, res, "格式錯誤");
                return [4 /*yield*/, todo_1.default.findByIdAndUpdate(id, { title: title })];
            case 15:
                patchResult = _d.sent();
                if (patchResult)
                    (0, handle_1.successHandle)(req, res);
                if (!patchResult)
                    (0, handle_1.errorHandle)(req, res, "無此id");
                return [3 /*break*/, 17];
            case 16:
                error_3 = _d.sent();
                (0, handle_1.errorHandle)(req, res, "格式錯誤");
                return [3 /*break*/, 17];
            case 17: return [3 /*break*/, 23];
            case 18:
                _d.trys.push([18, 20, , 21]);
                return [4 /*yield*/, todo_1.default.findByIdAndDelete(id)];
            case 19:
                deleteResult = _d.sent();
                if (!deleteResult)
                    (0, handle_1.errorHandle)(req, res, "無此id");
                if (deleteResult)
                    (0, handle_1.successHandle)(req, res);
                return [3 /*break*/, 21];
            case 20:
                error_4 = _d.sent();
                (0, handle_1.errorHandle)(req, res, "格式錯誤");
                return [3 /*break*/, 21];
            case 21: return [3 /*break*/, 23];
            case 22:
                (0, handle_1.errorHandle)(req, res, "路由錯誤");
                return [3 /*break*/, 23];
            case 23: return [2 /*return*/];
            case 24:
                (0, handle_1.errorHandle)(req, res, "路由錯誤");
                return [2 /*return*/];
        }
    });
}); });
var server = http_1.default.createServer(requestListener);
var _a = process.env, PORT = _a.PORT, DATABASE = _a.DATABASE, DATABASE_PASSWORD = _a.DATABASE_PASSWORD;
server.listen(PORT);
var url = DATABASE === null || DATABASE === void 0 ? void 0 : DATABASE.replace("<password>", DATABASE_PASSWORD);
mongoose_1.default.connect(url);
