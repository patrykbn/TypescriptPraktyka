var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const inquirer = require('inquirer');
const consola = require('consola');
var Action;
(function (Action) {
    Action["List"] = "list";
    Action["Add"] = "add";
    Action["Remove"] = "remove";
    Action["Quit"] = "quit";
})(Action || (Action = {}));
;
var MessageVariant;
(function (MessageVariant) {
    MessageVariant["Success"] = "success";
    MessageVariant["Error"] = "error";
    MessageVariant["Info"] = "info";
})(MessageVariant || (MessageVariant = {}));
class Message {
    constructor(content) {
        this.content = content;
    }
    show() {
        console.log(this.content);
    }
    capitalize() {
        this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
    }
    toUpperCase() {
        this.content = this.content.toUpperCase();
    }
    toLowerCase() {
        this.content = this.content.toLowerCase();
    }
    static showColorized(variant, text) {
        switch (variant) {
            case MessageVariant.Success:
                consola.success(text);
                break;
            case MessageVariant.Error:
                consola.error(text);
                break;
            case MessageVariant.Info:
                consola.info(text);
                break;
        }
    }
}
const msg = new Message("heLlo world!");
msg.show(); // "heLlo world!"
msg.capitalize();
msg.show(); // "Hello world!"
msg.toLowerCase();
msg.show(); // "hello world!"
msg.toUpperCase();
msg.show(); // "HELLO WORLD!"
Message.showColorized(MessageVariant.Success, "Test"); // √ "Test"
Message.showColorized(MessageVariant.Error, "Test 2"); // "x Test 2"
Message.showColorized(MessageVariant.Info, "Test 3"); // ℹ "Test 3"
const startApp = () => __awaiter(this, void 0, void 0, function* () {
    yield inquirer.prompt([{
            name: 'action',
            type: 'input',
            message: 'How can I help you?',
        }]).then((answers) => {
        console.log("Chosen action: " + answers.action);
        if (answers.action === "quit") {
            console.log("Goodbye!");
            return;
        }
        startApp();
    });
});
startApp();
//# sourceMappingURL=index.js.map