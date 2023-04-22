User.create!(username:"test" , name:"Max Alba", password:"abcd1234", password_confirmation:"abcd1234", profile_picture: "")
User.create!(username:"test2" , name:"J", password:"abcd1234", password_confirmation:"abcd1234", profile_picture: "")

Chatroom.create!(topic:"We've Got Worm", owner: User.first)
Chatroom.create!(topic: "We've Got Ward", owner: User.last)
Chatroom.create!(topic:"Where the Wild Things Are", owner: User.first)

User.first.subscriptions.create!(chatroom: Chatroom.find_by(topic: "We've Got Ward"))

User.first.subscriptions.first.messages.create!(chatroom:Chatroom.first, content: "Hellooo Chat")