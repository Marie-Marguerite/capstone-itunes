// middleware/requestCheck.js


// NOTE: For additional user request validation and security checks


//* 1. REJECT NON APPLICATION/JSON TYPE REQUESTS
const requireJson = (REQUEST, res, next) => {
  if (!REQUEST.is("application/json")) {
    console.log(`[REJECTED] Wrong format - not application/json`);

    return res
      .status(400)
      .json({ message: "Only JSON requests are allowed." });
  }

  next(); // continue
};

//* 2. REJECT TODOS OVER 140 CHARACTERS LIMIT
const rejectLongTodos = (req, res, next) => {
  if (
    typeof req.body.content === "string" &&
    req.body.content.length > 140
  ) {
    console.log(
      `[REJECTED] Too long (140character max) - Content has ${req.body.content.length}char.`
    );

    return res
      .status(400)
      .json({ message: "Todo content exceeds 140 characters." });
  }

  next(); // continue
};

//* 3. ONLY ALLOW @GMAIL.COM EMAIL ADDRESSES TO REGISTER (USER REGISTRATION)
const gmailOnly = (req, res, next) => {
  //  Checks
  console.log("Check email:", req.body?.email || req.user?.email);

  const userEmail = req.body?.email || req.user?.email;

  if (!userEmail || !userEmail?.endsWith("@gmail.com")) {
    console.log(
      `[REJECTED] Registered with non-gmail email address (not  @gmail.com) || no email`
    );

    return res
      .status(403)
      .json({ message: "You can only register with a Gmail email address." });
  }

  next(); // continue
};

//* EXPORT
module.exports = { requireJson, rejectLongTodos, gmailOnly };
