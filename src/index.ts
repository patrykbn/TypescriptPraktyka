const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
};
enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info"
}

type InquirerAnswers = {
  action: Action
}

interface User {
  name: string;
  age: number;
}

class Message {
  constructor(private content: string) {
  }

  public show(): void {
    console.log(this.content)
  }
  public capitalize(): void {
    this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
  }
  public toUpperCase(): void {
    this.content = this.content.toUpperCase()
  }
  public toLowerCase(): void {
    this.content = this.content.toLowerCase()
  }
  public static showColorized(variant: MessageVariant, text: string): void {
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

class UserData {
  public data: User[] = []

  public showAll(): void {
    Message.showColorized(MessageVariant.Info, "User Data");

    if (this.data.length > 0) {
      console.table(this.data);
    } else {
      console.log("No Data...")
    }
  }

  public add(user: User): void {
    if (typeof user.name === "string" && user.name.length > 0 && typeof user.age === "number" && user.age > 0) {
      this.data.push(user)
      Message.showColorized(MessageVariant.Success, "User has been added successfully!")
    } else {
      Message.showColorized(MessageVariant.Error, "Wrong input data!")
    }
  }

  public remove(name: string): void {
    const userIndex = this.data.findIndex(user => user.name === name)

    if (userIndex !== -1) {
      this.data.splice(userIndex, 1);
      Message.showColorized(MessageVariant.Success, "User successfully deleted")
    } else {
      Message.showColorized(MessageVariant.Error, "Could not find user with this name")
    }
  }
}

const users = new UserData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {

    if (!Object.values(Action).includes(answers.action as Action)) {
      Message.showColorized(MessageVariant.Error, "Command not found...")
      return startApp();
    }
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter Name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        users.add(user);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name to delete',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(MessageVariant.Info, "Bye!");
        return
    }
    startApp();
  });
}

startApp();
