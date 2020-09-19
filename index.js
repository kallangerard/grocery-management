const express = require('express');
const Joi = require('joi');
const app = express();

// Adding Middleware to request processing pipeline
app.use(express.json());

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
  { id: 4, name: 'course4' },
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  // Add course document to courses
  courses.push(course);
  // Return object created
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const courseID = parseInt(req.params.id);
  const course = courses.find((c) => c.id === courseID);
  if (!course) return res.status(404).send(`Course ${courseID} not found`);

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const courseID = parseInt(req.params.id);
  const course = courses.find((c) => c.id === courseID);
  if (!course) return res.status(404).send(`Course ${courseID} not found`);
  res.send(course);
});

const port = process.env.PORT || 5000;

app.delete('/api/courses/:id', (req, res) => {
  const courseID = parseInt(req.params.id);
  const course = courses.find((c) => c.id === courseID);
  if (!course) return res.status(404).send(`Course ${courseID} not found`);

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};
