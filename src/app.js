const express = require('express');
const loginRouter = require('./routers/loginRouter');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const postRouter = require('./routers/postsRouter');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
app.use((error, _req, res, _next) => {
    if (error.status) return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ message: error.message });
});

module.exports = app;
