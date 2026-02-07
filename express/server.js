require('dotenv').config();
const express = require('express');
// const db = require('./api/config/db');

const employeeRoutes = require('./api/routes/employee.routes');
const errorHandler = require('./api/middleware/errorHandler');
const invitationRoutes = require('./api/routes/invitation.routes');
const examRoutes = require('./api/routes/exam.routes');
const examAttemptRoutes = require('./api/routes/examAttempt.routes');
const questionParticipantRoutes = require('./api/routes/questionParticipant.routes');
const answerRoutes = require('./api/routes/answer.routes');
const resultRoutes = require('./api/routes/result.routes');

const cors = require("cors");
const app = express();
if (process.env.APP_CORS_ENABLE === "true") {
  const corsOptions = {
    origin: process.env.APP_CORS_ALLOWED_ORIGINS.split(","),
    methods: process.env.APP_CORS_ALLOWED_METHODS,
    allowedHeaders: process.env.APP_CORS_ALLOWED_HEADERS,
    credentials: process.env.APP_CORS_ALLOW_CREDENTIALS === "true",
    maxAge: parseInt(process.env.APP_CORS_MAX_AGE_SECONDS, 10),
  };

  app.use(cors(corsOptions)); // ✅ INI YANG PERLU DITAMBAHKAN
  console.log("✅ CORS enabled with options:", corsOptions);
} else {
  console.log("❌ CORS disabled");
}
// app.use(
//   cors({
//     origin: process.env.APP_CORS_ALLOWED_ORIGINS.split(","), // Sesuaikan dengan URL frontend Anda
//     credentials: true,
//     methods: process.env.APP_CORS_ALLOWED_METHODS,
//     allowedHeaders: process.env.APP_CORS_ALLOWED_HEADERS,
//   })
// );

app.use(express.json());
app.use('/api/employees', employeeRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/exam-attempts', examAttemptRoutes);
app.use('/api/participants', questionParticipantRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/results', resultRoutes);



app.use('/api/admins', require('./api/routes/admin.routes'));




app.use(errorHandler);

// app.get('/health', async (req, res) => {
//   const result = await db.query('SELECT NOW()');
//   res.json({
//     status: 'ok',
//     db_time: result.rows[0].now,
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
