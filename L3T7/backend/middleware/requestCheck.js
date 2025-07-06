// middleware/requestCheck.js


// NOTE: For additional user request validation and security checks


//* 1. REJECT NON APPLICATION/JSON TYPE REQUESTS
const requireJson = (request, response, next) => {
  if (!request.is("application/json")) {
    console.log(`[REJECTED] Wrong format - not application/json`);

    return response
      .status(400)
      .json({ message: "Only JSON requests are allowed." });
  }

  next(); // continue
};

//* 2. REJECT TODOS OVER 140 CHARACTERS LIMIT
const rejectLongTodos = (request, response, next) => {
  if (
    typeof request.body.content === "string" &&
    request.body.content.length > 140
  ) {
    console.log(
      `[REJECTED] Too long (140character max) - Content has ${request.body.content.length}char.`
    );

    return response
      .status(400)
      .json({ message: "Todo content exceeds 140 characters." });
  }

  next(); // continue
};

//* 3. ONLY ALLOW @GMAIL.COM EMAIL ADDRESSES TO REGISTER (USER REGISTRATION)
const gmailOnly = (request, response, next) => {
  //  Checks
  console.log("Check email:", request.body?.email || request.user?.email);

  const userEmail = request.body?.email || request.user?.email;

  if (!userEmail || !userEmail?.endsWith("@gmail.com")) {
    console.log(
      `[REJECTED] Registered with non-gmail email address (not  @gmail.com) || no email`
    );

    return response
      .status(403)
      .json({ message: "You can only register with a Gmail email address." });
  }

  next(); // continue
};

//* EXPORT
module.exports = { requireJson, rejectLongTodos, gmailOnly };
