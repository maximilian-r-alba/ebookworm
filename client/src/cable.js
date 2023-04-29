import { createConsumer } from '@rails/actioncable';
// const URL = 'ws://localhost:3000/cable';
const URL = "https://ebookwormclub-project.onrender.com"
const consumer = createConsumer(URL);
 
export default consumer;