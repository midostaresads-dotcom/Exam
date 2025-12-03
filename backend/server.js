const express = require("express");
const cors = require("cors");
const db = require('./db');
const resultsRoutes = require('./routes/results');
const examsRoutes = require('./routes/exams');
const studentsRoutes = require('./routes/students');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/results', resultsRoutes);
app.use('/exams', examsRoutes);
app.use('/students', studentsRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
