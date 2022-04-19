/*
import { v4 as uuidv4 } from "uuid";

// const transactions = [
//   {
//     const: 3200,
//     date: new Date(),
//     description: "Test Expence",
//     splitBy: "EQUAL",
//     splits: [],
//   },
// ];

const friends = [
  {
    id: uuidv4(),
    name: "Sandeep",
    phone: "7718881561",
    balance: 2100,
  },
];

const addExpence = () => {};

let structure = {
  user: {
    id: "user_1",
    name: "Sandeep",
    phone: "1234567890",
    balance: 0,
  },
  friends: [{ name: "Abc", phone: "9876543210", id: "user_2" }],
  expences: [
    {
      cost: "1400",
      createdBy: {
        id: "user_1",
        name: "Sandeep",
        phone: "9988810123",
        balance: 466.67,
      },
      date: "Sat Apr 16 2022 18:48:09 GMT+0530 (India Standard Time)",
      discription: "Something",
      id: "b3c18d8a-0d62-4c97-8c4e-54f4e644941b",
      paidBy: "user_1",
      splitBy: "EQUAL",
      splits: [],
    },
  ],
};

// (database = users), transactions;

userObj = {
  id: "",
  name: "",
  email: "",
  phone: "",
};

transObj = {
  id: "test",
  createdBy: "",
  amout: 1300,
  split: "amount",
  splitData: [
    {
      id: "test",
      data: 500,
    },
    {
      id: "test2",
      data: 800,
    },
  ],
};

const transactions = [
  {
    createdBy: "test",
    createdFor: "test2",
    id: 124,
    amount: -100,
  },
  {
    createdBy: "test",
    createdFor: "test3",
    id: 124,
    amount: 200,
  },
  {
    createdBy: "test",
    createdFor: "test4",
    id: 124,
    amount: -300,
  },

  {
    createdBy: "test",
    createdFor: "test4",
    id: 124,
    amount: 100,
  },
];
console.log(_.groupBy(transactions, 'createdFor'));

obj1 = {
  test4: 100,
  test3: 300,
  test2: 100,
};


// transactionsLocal1.forEach(trans => {
//   if(trans.paidBy === expenceObj.createdBy.id && trans.paidFor === expenceObj.createdBy.id) return;

//   if(trans.paidBy === expenceObj.createdBy.id){
//     if(trackUsers.youOwed.indexOf(trans.paidFor) === -1){

//       if(expenseData.youOwe[trans.paidFor]){
//         const difference = expenseData.youOwe[trans.paidFor] - trans.amount;
//         if(difference > 0) expenseData.youOwed[trans.paidFor] = difference;
//         else {
//           delete expenseData.youOwe[trans.paidFor];
//           delete expenseData.youOwed[trans.paidFor];
//         }
//       } else {
//         expenseData.youOwed[trans.paidFor] = trans.amount;
//         trackUsers.youOwed.push(trans.paidFor)
//       }
//     } else {

//       if(expenseData.youOwe[trans.paidFor]){
//         const difference = expenseData.youOwe[trans.paidFor] - trans.amount;
//         if(difference > 0) expenseData.youOwed[trans.paidFor] = difference;
//         else {
//           delete expenseData.youOwe[trans.paidFor];
//           delete expenseData.youOwed[trans.paidFor];
//         }
//       } else {
//         expenseData.youOwed[trans.paidFor] += trans.amount;
//       }
//     }
//   }
//   if(trans.paidFor === expenceObj.createdBy.id){

//     if(trackUsers.youOwe.indexOf(trans.paidBy) === -1){
//       if(expenseData.youOwed[trans.paidBy]){
//         const difference = expenseData.youOwed[trans.paidBy] - trans.amount;
//         if(difference > 0) expenseData.youOwe[trans.paidBy] = difference;
//         else {
//           delete expenseData.youOwed[trans.paidBy];
//           delete expenseData.youOwe[trans.paidBy];
//         }
//       } else {
//         expenseData.youOwe[trans.paidBy] = trans.amount;
//         trackUsers.youOwe.push(trans.paidBy)
//       }
      
//     } else {
//       if(expenseData.youOwed[trans.paidBy]){
//         const difference = expenseData.youOwed[trans.paidBy] - trans.amount;
//         if(difference > 0) expenseData.youOwe[trans.paidBy] = difference;
//         else {
//           delete expenseData.youOwed[trans.paidBy];
//           delete expenseData.youOwe[trans.paidBy];
//         }
//       } else {
//         expenseData.youOwe[trans.paidBy] += trans.amount;
//       }
//     }
//   }
// })

// console.log(expenseData)

// }

// const getSummary = () => {}



const countDifference = (obj, KEY1, key, amount) => {
  if (KEY1 === "youOwe") {
    console.log("inside youowe");
    const difference =
      obj.youOwe[key] > amount
        ? obj.youOwe[key] - amount
        : amount - obj.youOwe[key];
    if (difference > 0) {
      if (obj.youOwe[key] > amount) {
        obj.youOwe[key] = difference;
        delete obj.youOwed[key];
      } else {
        obj.youOwed[key] = difference;
        delete obj.youOwe[key];
      }
    } else {
      delete obj.youOwe[key];
    }
  } else if (KEY1 === "youOwed") {
    console.log("inside youowed");
    const difference =
      obj.youOwed[key] > amount
        ? obj.youOwed[key] - amount
        : amount - obj.youOwed[key];
    if (difference > 0) {
      if (obj.youOwed[key] > amount) {
        obj.youOwed[key] = difference;
        delete obj.youOwe[key];
      } else {
        obj.youOwe[key] = difference;
        delete obj.youOwed[key];
      }
    } else {
      delete obj.youOwed[key];
    }
  }
};
*/