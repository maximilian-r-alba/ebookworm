import { createConsumer } from '@rails/actioncable';
// const URL = 'wss://localhost:3000/cable';
const URL = "wss://ebookwormclub-project.onrender.com/cable"
const consumer = createConsumer(URL);
 
export default consumer;