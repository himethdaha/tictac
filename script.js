function swimmer(name) {
  return {
    swim: () => {
      console.log(`${name} swam`);
    },
  };
}

const obj = swimmer("Eagle");
obj.swim();

const alphabet = ["A", "B", "C", "D", "E"];
const numbers = [1, 2, 3, 4, 5];

const [a, , c, ...d] = alphabet;
console.log(a, c, d);

const conjoinedArray = [...alphabet, ...numbers];
console.log(conjoinedArray);

const objs = { a: 10, b: 90 };
const { a: first } = objs;
console.log(first);

const personOne = {
  name: "kyle",
  age: 32,
  favFood: "watermelon",
  address: {
    city: "Somewhere",
    state: "ON",
  },
};

const personTwo = {
  name: "Sally",
  age: 34,
  favFood: "Rice",
  address: {
    city: "Somewhere Else",
    state: "MN",
  },
};

const personThree = { ...personOne, ...personTwo };
console.log(personThree);
