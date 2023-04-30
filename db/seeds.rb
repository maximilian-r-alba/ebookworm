User.create!(username:"test" , name:"Max Alba", password:"abcd1234", password_confirmation:"abcd1234", profile_picture: "")
User.create!(username:"test2" , name:"J", password:"abcd1234", password_confirmation:"abcd1234", profile_picture: "")

Chatroom.create!(topic:"We've Got Worm", owner: User.first)
Chatroom.create!(topic: "We've Got Ward", owner: User.last)
Chatroom.create!(topic:"Where the Wild Things Are", owner: User.last)

User.first.subscriptions.create!(chatroom: Chatroom.find_by(topic: "We've Got Ward"))
User.first.subscriptions.first.messages.create!(chatroom:Chatroom.first, content: "Hellooo Chat")


User.second.subscriptions.create!(chatroom: Chatroom.find_by(topic: "We've Got Worm"))
User.second.subscriptions.find_by(chatroom: Chatroom.first).messages.create!(chatroom: Chatroom.first, content: "hello!")


      books =  [
            {
                "title": "Worm",
                "author": "WildBow",
                "img_url": "https://audioworm.rein-online.org/wp-content/uploads/2014/06/cropped-Worm-Audiobook1.png",
                "rating": 0,
                "description": "Taylor Hebert is a fifteen-year-old parahuman who has developed the power to sense and control insects following a traumatic event at the hands of bullies. She lives in the fictional city of Brockton Bay, a hotspot of parahuman activity, and seeks to become a superhero. On her first night out in costume, she defeats a superpowered gang leader and is subsequently mistaken for a villain by a team of teenage parahuman thieves known as the Undersiders who work jobs for a mysterious benefactor."
            },
            {
              
                "title": "The Gunslinger",
                "author": "Stephen King",
                "img_url": "https://covers.openlibrary.org/b/id/8396638-M.jpg",
                "rating": 0,
                "description": "[The Dark Tower][1] I\r\n\r\nThe Gunslinger is a dark-fantasy by American author Stephen King. It is the first volume in the Dark Tower series.\r\n\r\nThe Gunslinger was first published in 1982 as a fix-up novel, joining five short stories that had been published between 1978 and 1981. King substantially revised the novel in 2003; this version has remained in print ever since, with the subtitle RESUMPTION.\r\n\r\nThe story centers upon Roland Deschain, the last gunslinger, who has been chasing his adversary, \"the man in black,\" for many years. The novel fuses Western fiction with fantasy, science fiction, and horror, following Roland's trek through a vast desert and beyond in search of the man in black. Roland meets several people along his journey, including a boy named Jake Chambers, who travels with him part of the way.\r\n\r\n\"The Gunslinger\" (October 1978)\r\n\"The Way Station\" (April 1980)\r\n\"The Oracle and the Mountains\" (February 1981)\r\n\"The Slow Mutants\" (July 1981)\r\n\"The Gunslinger and the Dark Man\" (November 1981)\r\n\r\n  [1]: https://openlibrary.org/works/OL81600W/The_Dark_Tower_1-7"
            },
            {
               
                "title": "Ward",
                "author": "WildBow",
                "img_url": nil,
                "rating": 0,
                "description": "The unwritten rules that govern the fights and outright wars between ‘capes’ have been amended: everyone gets their second chance. It’s an uneasy thing to come to terms with when notorious supervillains and even monsters are playing at being hero. The world ended two years ago, and as humanity straddles the old world and the new, there aren’t records, witnesses, or facilities to answer the villains’ past actions in the present. One of many compromises, uneasy truces and deceptions that are starting to splinter as humanity rebuilds.\n\n    None feel the injustice of this new status quo or the lack of established footing more than the past residents of the parahuman asylums. The facilities hosted parahumans and their victims, but the facilities are ruined or gone; one of many fragile ex-patients is left to find a place in a fractured world. She’s perhaps the person least suited to have anything to do with this tenuous peace or to stand alongside these false heroes. She’s put in a position to make the decision: will she compromise to help forge what they call, with dark sentiment, a second golden age? Or will she stand tall as a gilded dark age dawns?"
            },
            {
             
                "title": "Neverwhere",
                "author": "Neil Gaiman",
                "img_url": "https://covers.openlibrary.org/b/id/13921349-M.jpg",
                "rating": 0,
                "description": "No Description Available"
            },
            {
              
                "title": "Ender's Game",
                "author": "Orson Scott Card",
                "img_url": "https://covers.openlibrary.org/b/id/12996033-M.jpg",
                "rating": 0,
                "description": "Ender's Game is a 1985 military science fiction novel by American author Orson Scott Card. Set at an unspecified date in Earth's future, the novel presents an imperiled humankind after two conflicts with the Formics, an insectoid alien species they dub the \"buggers\". In preparation for an anticipated third invasion, children, including the novel's protagonist, Andrew \"Ender\" Wiggin, are trained from a very young age by putting them through increasingly difficult games, including some in zero gravity, where Ender's tactical genius is revealed.\r\n\r\nThe book originated as a short story of the same name, published in the August 1977 issue of Analog Science Fiction and Fact. The novel was published on January 15, 1985. Later, by elaborating on characters and plotlines depicted in the novel, Card was able to write additional books in the Ender's Game series. Card also released an updated version of Ender's Game in 1991, changing some political facts to reflect the times more accurately (e.g., to include the recent collapse of the Soviet Union and the end of the Cold War). The novel has been translated into 34 languages.\r\n\r\nReception of the book has been mostly positive. It has become suggested reading for many military organizations, including the United States Marine Corps. Ender's Game was recognized as \"best novel\" by the 1985 Nebula Award[3] and the 1986 Hugo Award[4] in the genres of science fiction and fantasy. Its four sequels—Speaker for the Dead (1986), Xenocide (1991), Children of the Mind (1996), and Ender in Exile (2008)—follow Ender's subsequent travels to many different worlds in the galaxy. In addition, the later novella A War of Gifts (2007) and novel Ender's Shadow (1999), plus other novels in the Shadow saga, take place during the same time period as the original.\r\n\r\n\r\n----------\r\n\r\nContained in:\r\n[Ender's War](https://openlibrary.org/works/OL49619W)\r\nSee also:\r\n\r\n - [Ender's Game: 1/2](https://openlibrary.org/works/OL19647657W/Ender's_Game._1_2)\r\n\r\n  [1]: http://www.hatrack.com/osc/books/endersgame/"
            },
            {
              
                "title": "The Running Man",
                "author": "Stephen King",
                "img_url": "https://covers.openlibrary.org/b/id/8565864-M.jpg",
                "rating": 0,
                "description": "The Running Man is a dystopian thriller novel by American writer Stephen King, first published under the pseudonym Richard Bachman in 1982 as a paperback original. It was collected in 1985 in the omnibus The Bachman Books. The novel is set in a dystopian United States during the year 2025, in which the nation's economy is in ruins and world violence is rising.\r\n\r\nThe story follows protagonist Ben Richards as he participates in the reality show The Running Man in which contestants, allowed to go anywhere in the world, are chased by the general public, who get a huge bounty if they kill him.\r\n\r\nThe book has a total of 101 chapters, laid out in a \"countdown\" format. The first is titled \"Minus 100 and Counting ...\" with the numbers decreasing, ending with the last chapter called \"Minus 000 and Counting\" (or, in some versions, simply \"000\").\r\n\r\n\r\n----------\r\nAlso contained in:\r\n\r\n - [The Bachman Books][2]\r\n - [The Bachman Books](https://openlibrary.org/works/OL24796729W)\r\n\r\n\r\n\r\n  [1]: https://stephenking.com/library/bachman_novel/running_man_the.html\r\n  [2]: https://openlibrary.org/works/OL81591W/The_Bachman_Books_(Rage_The_Long_Walk_Roadwork_The_Running_Man)"
            },
            {
                "id": 66,
                "title": "Do Androids Dream of Electric Sheep?",
                "author": "Philip Dick",
                "img_url": "https://covers.openlibrary.org/b/id/13681045-M.jpg",
                "rating": 0,
                "description": "No Description Available"
              
            },
            {
                "title": "Kafka on the Shore",
                "author": "Haruki Murakami",
                "img_url": "https://covers.openlibrary.org/b/id/12657305-M.jpg",
                "rating": 0,
                "description": "\"Kafka on the Shore\" is a novel written by Japanese author Haruki Murakami. The novel follows two main characters: Kafka Tamura, a teenage boy who runs away from home to escape an Oedipal curse, and Nakata, an older man with the ability to talk to cats. The novel is set in Japan and explores themes of loss, guilt, and the search for identity.\r\n\r\nKafka's story is set in a small town in Japan and follows his journey as he tries to find his place in the world and escape the curse that his father has placed on him. Along the way, he meets a diverse cast of characters, including Miss Saeki, the librarian who becomes a mother figure to him, and Oshima, a transvestite who becomes his friend and mentor.\r\n\r\nNakata's story, on the other hand, is set in Tokyo and tells of his journey to find a lost cat and his own identity. Nakata is a man with a childlike mind and limited education, who has the ability to talk to cats. The journey takes him to meet different people and he will learn about his own past and how his life is connected to Kafka's.\r\n\r\nThe novel is known for its blending of realistic and surreal elements, as well as its exploration of deep philosophical and psychological themes. The novel was well received by critics and considered a classic of contemporary literature."
           
            }
        ]

books.each{|book| Book.create!(book)}

10.times {
    User.create!({name: Faker::Name.name, username: Faker::Internet.user('username')[:username], password: 'faker123' , password_confirmation: 'faker123',  headline:Faker::Quote.famous_last_words})
}

User.all.each{ |user| 
        user.reviews.create!(book:Book.all.sample, rating:rand(1..5), title:Faker::Quote.robin, body: Faker::Quote.matz)
    }
   