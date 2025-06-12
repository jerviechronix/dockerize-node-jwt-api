require('dotenv').config();
const express = require('express');
const setupSwagger = require('./swagger');
const authRoutes = require('./auth');
const userRoutes = require('./routes/users');



const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// ✅ Swagger setup
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
