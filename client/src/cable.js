import { createConsumer } from '@rails/actioncable';
// const URL = 'ws://localhost:3000/cable';
const URL = "wss://ebookwormclub-project.onrender.com:3000"
const consumer = createConsumer(URL);
 
export default consumer;