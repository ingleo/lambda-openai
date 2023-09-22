export const createMessages = (traits, categories) => {
  let messagesForCompletion = [];
  const sysMessage = {
    role: 'system',
    content: 'You are a helpful and precise assistant.',
  };

  messagesForCompletion.push(sysMessage);

  messagesForCompletion = [...messagesForCompletion, ...getTraitMsgs(traits)];

  messagesForCompletion = [
    ...messagesForCompletion,
    getCategoriesMsg(categories),
  ];

  return messagesForCompletion;
};

const getTraitMsgs = (traits) => {
  let messages = [];
  const firstPremise = 'A person is ';
  const middlePremise = 'the person is also ';
  const finalPremise = 'and the person is also';

  traits.forEach((trait, index) => {
    let usrMessage = { role: 'user' };

    if (index === 0) {
      usrMessage = { ...usrMessage, content: `${firstPremise} ${trait}, ` };
    } else if (index === traits.length - 1) {
      usrMessage = { ...usrMessage, content: `${finalPremise} ${trait}.` };
    } else {
      usrMessage = { ...usrMessage, content: `${middlePremise} ${trait}, ` };
    }

    messages.push(usrMessage);
  });

  return messages;
};

const getCategoriesMsg = (categories) => {
  const startQuestion = 'Could you tell me a numeric list with only names of ten';
  const endQuestion =
    'without providing additional details, for this person according to their personality and put them in double quotes?';
  /*   const formatComplementOne = 'in json format grouping by ';
  const formatComplementTwo = 'using camel case.'; */
  let usrMessage = { role: 'user' };
  let categoriesStr = '';
  categories.forEach((category, index) => {
    if (index === 0 && categories.length <= 1) {
      categoriesStr += `${category}`;
    } else if (index === categories.length - 1 && categories.length > 1) {
      categoriesStr += `and ${category}`;
    } else {
      categoriesStr += `${category}, `;
    }
  });

  console.log(`${startQuestion} ${categoriesStr} ${endQuestion}`);

  return {
    ...usrMessage,
    content: `${startQuestion} ${categoriesStr} ${endQuestion}`,
  };
};
