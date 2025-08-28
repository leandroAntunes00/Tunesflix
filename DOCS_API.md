Parameters
Cancel
Name	Description
q *
string
(query)
Search query

batman
page
integer
(query)
Page number

1


curl -X 'GET' \
  'http://localhost:3000/api/movies/search?q=batman&page=1' \
  -H 'accept: */*'

{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/2va32apQP97gvUxaMnL5wYt4CRB.jpg",
      "genre_ids": [
        14,
        28,
        80
      ],
      "id": 268,
      "original_language": "en",
      "original_title": "Batman",
      "overview": "Having witnessed his parents' brutal murder as a child, millionaire philanthropist Bruce Wayne fights crime in Gotham City disguised as Batman, a costumed hero who strikes fear into the hearts of villains. But when a deformed madman known as 'The Joker' seizes control of Gotham's criminal underworld, Batman must face his most ruthless nemesis ever while protecting both his identity and his love interest, reporter Vicki Vale.",
      "popularity": 10.2726,
      "poster_path": "https://image.tmdb.org/t/p/w500/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg",
      "release_date": "1989-06-21",
      "title": "Batman",
      "video": false,
      "vote_average": 7.235,
      "vote_count": 8164
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/nOWOU0bdX76iF9XA1YPlInLbI4Y.jpg",
      "genre_ids": [
        28,
        35,
        80
      ],
      "id": 2661,
      "original_language": "en",
      "original_title": "Batman",
      "overview": "The Dynamic Duo faces four super-villains who plan to hold the world for ransom with the help of a secret invention that instantly dehydrates people.",
      "popularity": 2.9794,
      "poster_path": "https://image.tmdb.org/t/p/w500/zzoPxWHnPa0eyfkMLgwbNvdEcVF.jpg",
      "release_date": "1966-07-30",
      "title": "Batman",
      "video": false,
      "vote_average": 6.404,
      "vote_count": 994
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/bHxJA9rllKF2jhb11ARAwZJYSp6.jpg",
      "genre_ids": [
        28,
        12,
        80,
        878,
        53,
        10752
      ],
      "id": 125249,
      "original_language": "en",
      "original_title": "Batman",
      "overview": "Japanese master spy Daka operates a covert espionage-sabotage organization located in Gotham City's now-deserted Little Tokyo, which turns American scientists into pliable zombies. The great crime-fighters Batman and Robin, with the help of their allies, are in pursuit.",
      "popularity": 3.0896,
      "poster_path": "https://image.tmdb.org/t/p/w500/AvzD3mrtokIzZOiV6zAG7geIo6F.jpg",
      "release_date": "1943-07-16",
      "title": "Batman",
      "video": false,
      "vote_average": 6.4,
      "vote_count": 116
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 1535095,
      "original_language": "es",
      "original_title": "Batman",
      "overview": "",
      "popularity": 0.2193,
      "poster_path": null,
      "release_date": "",
      "title": "Batman",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/e807jDKiFcntZS32ze88X6I96OD.jpg",
      "genre_ids": [
        16,
        28,
        878
      ],
      "id": 1297763,
      "original_language": "ja",
      "original_title": "ニンジャバットマン対ヤクザリーグ",
      "overview": "The Batman family has returned to the present to discover that Japan has disappeared, and a giant island - Hinomoto - is now in the sky over Gotham City.  At the top sit the Yakuza, a group of superpowered individuals who reign without honor or humanity and look suspiciously like the Justice League. Now, it’s up to Batman and his allies to save Gotham!",
      "popularity": 12.0453,
      "poster_path": "https://image.tmdb.org/t/p/w500/sVVT6GYFErVv0Lcc9NvqCu0iOxO.jpg",
      "release_date": "2025-03-17",
      "title": "Batman Ninja vs. Yakuza League",
      "video": false,
      "vote_average": 6.722,
      "vote_count": 194
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/h3ONuaWzfaylqMkexFX7TpCxQjh.jpg",
      "genre_ids": [
        16,
        28,
        12
      ],
      "id": 987400,
      "original_language": "es",
      "original_title": "Batman Azteca: Choque de imperios",
      "overview": "In the time of the Aztec empire, tragedy strikes Yohualli Coatl when his father is murdered by Spanish conquistadors. To warn King Moctezuma and his high priest, Yoka, of imminent danger, Yohualli escapes to Tenochtitlán. There, he trains in the temple of the bat god Tzinacan with his mentor, developing equipment and weaponry to confront the Spanish invasion and avenge his father’s death. Along the way, he encounters key figures like the fierce Jaguar Woman and the conquistador Hernán Cortés.",
      "popularity": 2.0219,
      "poster_path": "https://image.tmdb.org/t/p/w500/mJJv232QS0XWYsJx2AdUM3oUu9D.jpg",
      "release_date": "2025-09-18",
      "title": "Aztec Batman: Clash of Empires",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
      "genre_ids": [
        80,
        9648,
        53
      ],
      "id": 414906,
      "original_language": "en",
      "original_title": "The Batman",
      "overview": "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
      "popularity": 23.703,
      "poster_path": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
      "release_date": "2022-03-01",
      "title": "The Batman",
      "video": false,
      "vote_average": 7.658,
      "vote_count": 11169
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        99
      ],
      "id": 1430994,
      "original_language": "fr",
      "original_title": "Mon ami Batman Tremblay",
      "overview": "",
      "popularity": 0.1783,
      "poster_path": "https://image.tmdb.org/t/p/w500/oTsDdOE6barmJ82ksc3xVvaU7sh.jpg",
      "release_date": "2025-02-25",
      "title": "Mon ami Batman Tremblay",
      "video": false,
      "vote_average": 5,
      "vote_count": 2
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/tfAUzY0nnlBXoqdKR3vpkdqk5IN.jpg",
      "genre_ids": [
        28,
        12,
        14
      ],
      "id": 209112,
      "original_language": "en",
      "original_title": "Batman v Superman: Dawn of Justice",
      "overview": "Fearing the actions of a god-like Super Hero left unchecked, Gotham City’s own formidable, forceful vigilante takes on Metropolis’s most revered, modern-day savior, while the world wrestles with what sort of hero it really needs. And with Batman and Superman at war with one another, a new threat quickly arises, putting mankind in greater danger than it’s ever known before.",
      "popularity": 17.6744,
      "poster_path": "https://image.tmdb.org/t/p/w500/5UsK3grJvtQrtzEgqNlDljJW96w.jpg",
      "release_date": "2016-03-23",
      "title": "Batman v Superman: Dawn of Justice",
      "video": false,
      "vote_average": 6,
      "vote_count": 18459
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        18
      ],
      "id": 148918,
      "original_language": "ro",
      "original_title": "Superman, Spider-Man sau Batman",
      "overview": "Aron, a 5-year-old boy, sets together with his worried father on a journey at the end of which he wishes, like the superheroes in the comic books, to save his mother suffering from a heart condition.",
      "popularity": 1.2851,
      "poster_path": "https://image.tmdb.org/t/p/w500/iUp85s5s7eaPbuCUNqOCeJCEVpY.jpg",
      "release_date": "2011-06-01",
      "title": "Superman, Spider-Man or Batman",
      "video": false,
      "vote_average": 6.9,
      "vote_count": 23
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/ew5FcYiRhTYNJAkxoVPMNlCOdVn.jpg",
      "genre_ids": [
        18,
        80,
        28
      ],
      "id": 272,
      "original_language": "en",
      "original_title": "Batman Begins",
      "overview": "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
      "popularity": 13.3823,
      "poster_path": "https://image.tmdb.org/t/p/w500/sPX89Td70IDDjVr85jdSBb4rWGr.jpg",
      "release_date": "2005-06-10",
      "title": "Batman Begins",
      "video": false,
      "vote_average": 7.716,
      "vote_count": 21733
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/silcq0dj3Scf1LtpBjjVKXMQXS2.jpg",
      "genre_ids": [
        16,
        28,
        878
      ],
      "id": 485942,
      "original_language": "ja",
      "original_title": "ニンジャバットマン",
      "overview": "Batman, along with many of his allies and adversaries, finds himself transported to feudal Japan by Gorilla Grodd's time displacement machine.",
      "popularity": 2.9027,
      "poster_path": "https://image.tmdb.org/t/p/w500/5xSB0Npkc9Fd9kahKBsq9P4Cdzp.jpg",
      "release_date": "2018-06-15",
      "title": "Batman Ninja",
      "video": false,
      "vote_average": 5.861,
      "vote_count": 908
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/rpOqHZMNIaI4qP4r7nw1B7oA0mx.jpg",
      "genre_ids": [
        28,
        878,
        12
      ],
      "id": 415,
      "original_language": "en",
      "original_title": "Batman & Robin",
      "overview": "Batman and his sidekick Robin attempt to the foil the sinister schemes of a deranged set of new villains, most notably the melancholy Mr. Freeze, who wants to make Gotham City into an arctic region, and the sultry Poison Ivy, a botanical femme fatale. As the Dynamic Duo contend with these bad guys, a third hero, Batgirl, joins the ranks of the city's crime-fighters.",
      "popularity": 10.7985,
      "poster_path": "https://image.tmdb.org/t/p/w500/i7hEUpDuMN2LOrCEifFyGSHZQSY.jpg",
      "release_date": "1997-06-20",
      "title": "Batman & Robin",
      "video": false,
      "vote_average": 4.378,
      "vote_count": 5186
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        35,
        28
      ],
      "id": 131185,
      "original_language": "tl",
      "original_title": "Alyas Batman En Robin",
      "overview": "Alyas Batman en Robin is a 1991 Filipino Batman comedy film produced by Regal Films spoofing the 1960s Batman television series. The movie was initially an unauthorized production, set to capitalize on the then in-production 1989 Batman film starring Michael Keaton. Warner Brothers threatened legal action and the release of the film was delayed until legal entanglements could be sorted out. The film was released in 1991, two years later than the intended 1989 release.",
      "popularity": 0.3699,
      "poster_path": "https://image.tmdb.org/t/p/w500/m7ysdICz4AMvFTU8wYKz3i69n6P.jpg",
      "release_date": "1991-04-06",
      "title": "Alias Batman and Robin",
      "video": false,
      "vote_average": 5.1,
      "vote_count": 8
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/moYfd709S8xnb8Od2yeG5VBt9Bp.jpg",
      "genre_ids": [
        28,
        14
      ],
      "id": 364,
      "original_language": "en",
      "original_title": "Batman Returns",
      "overview": "The monstrous Penguin, who dwells in the sewers beneath Gotham, joins up with corrupt mayoral candidate Max Shreck to topple the Batman once and for all. But when Shreck's timid assistant Selina Kyle finds out, and Shreck tries to kill her, she's transformed into the sexy Catwoman. She teams up with the Penguin and Shreck to destroy Batman, but sparks fly unexpectedly when she confronts the caped crusader.",
      "popularity": 8.3349,
      "poster_path": "https://image.tmdb.org/t/p/w500/jKBjeXM7iBBV9UkUcOXx3m7FSHY.jpg",
      "release_date": "1992-06-19",
      "title": "Batman Returns",
      "video": false,
      "vote_average": 6.941,
      "vote_count": 6767
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/g01B5oD3j2sIupAQY2Ykm4TIRks.jpg",
      "genre_ids": [
        16,
        28,
        35,
        10751
      ],
      "id": 324849,
      "original_language": "en",
      "original_title": "The Lego Batman Movie",
      "overview": "A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick.",
      "popularity": 8.0586,
      "poster_path": "https://image.tmdb.org/t/p/w500/snGwr2gag4Fcgx2OGmH9otl6ofW.jpg",
      "release_date": "2017-02-08",
      "title": "The Lego Batman Movie",
      "video": false,
      "vote_average": 7.228,
      "vote_count": 5186
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
        28
      ],
      "id": 1272910,
      "original_language": "es",
      "original_title": "Batman y el Titiritero",
      "overview": "",
      "popularity": 0.1275,
      "poster_path": "https://image.tmdb.org/t/p/w500/eu0iistQfM7TjK9FJY2R63lyAhk.jpg",
      "release_date": "2012-04-10",
      "title": "Batman Puppet Master",
      "video": false,
      "vote_average": 7,
      "vote_count": 1
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [],
      "id": 1338401,
      "original_language": "pt",
      "original_title": "As Aventuras com o Batman 2",
      "overview": "After the crisis caused by Matheus in the city, the toys start to worry more about their own safety. Additionally, Batman’s absence from the lives of the citizens increases the chances of Matheus carrying out his plan for revenge, which involves using two innocent toys as test subjects. These events could lead to serious consequences for both the community and the individuals involved.",
      "popularity": 0.0646,
      "poster_path": "https://image.tmdb.org/t/p/w500/8I6Lr7junGoMjJKdF15i1S8UAyJ.jpg",
      "release_date": "2019-05-20",
      "title": "Adventures with Batman 2",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/z6cCtZmBd37p6XzTsDdO2TGwVhA.jpg",
      "genre_ids": [
        35,
        28,
        80,
        12
      ],
      "id": 1332473,
      "original_language": "en",
      "original_title": "Batman a Modrý Joker Mají Problém",
      "overview": "Batman finally catches The Joker and tries to interrogate him about the dissappearence of Herobrine, but Joker has become a blue lipstick liberal and now Batman has to discover his secrets, accompanied by his new companion - Robin / Terkel! The whole movie is improvized and has been made in less than a week",
      "popularity": 0.1089,
      "poster_path": "https://image.tmdb.org/t/p/w500/tnUhWYdmMGkshSX2uqQ82Qm1ENW.jpg",
      "release_date": "2024-08-17",
      "title": "Batman and Blue Joker in Trouble",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/ccHxynNF7tTb6YyyUjl9tBvnLlH.jpg",
      "genre_ids": [
        35,
        10751
      ],
      "id": 1338370,
      "original_language": "pt",
      "original_title": "As Aventuras com o Batman",
      "overview": "A PARODY MOVIE. Batman holds a contest to decide who will be his new sidekick, but a completely mysterious person invades the contest and enslaves everyone in the city.",
      "popularity": 0.0379,
      "poster_path": "https://image.tmdb.org/t/p/w500/n0A0T0mFa3jNz6swGRv7a4pVPGL.jpg",
      "release_date": "2018-12-02",
      "title": "Adventures with Batman",
      "video": false,
      "vote_average": 0,
      "vote_count": 0
    }
  ],
  "total_pages": 10,
  "total_results": 195
}


Name	Description
page
integer
(query)
Page number

1


curl -X 'GET' \
  'http://localhost:3000/api/movies/popular?page=1' \
  -H 'accept: */*'


{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/iZLqwEwUViJdSkGVjePGhxYzbDb.jpg",
      "genre_ids": [
        878,
        53
      ],
      "id": 755898,
      "original_language": "en",
      "original_title": "War of the Worlds",
      "overview": "Will Radford is a top analyst for Homeland Security who tracks potential threats through a mass surveillance program, until one day an attack by an unknown entity leads him to question whether the government is hiding something from him... and from the rest of the world.",
      "popularity": 1173.9925,
      "poster_path": "https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg",
      "release_date": "2025-07-29",
      "title": "War of the Worlds",
      "video": false,
      "vote_average": 4.249,
      "vote_count": 419
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/ZtcGMc204JsNqfjS9lU6udRgpo.jpg",
      "genre_ids": [
        28,
        18
      ],
      "id": 911430,
      "original_language": "en",
      "original_title": "F1",
      "overview": "Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.",
      "popularity": 975.1859,
      "poster_path": "https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg",
      "release_date": "2025-06-25",
      "title": "F1",
      "video": false,
      "vote_average": 7.804,
      "vote_count": 1545
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/xk0ck8qmYmevisTmphWIDm1g43p.jpg",
      "genre_ids": [
        53,
        28,
        35
      ],
      "id": 1151334,
      "original_language": "en",
      "original_title": "Eenie Meanie",
      "overview": "A former teenage getaway driver gets dragged back into her unsavory past when a former employer offers her a chance to save the life of her chronically unreliable ex-boyfriend.",
      "popularity": 822.4163,
      "poster_path": "https://image.tmdb.org/t/p/w500/12Va3oO3oYUdOd75zM57Nx1976a.jpg",
      "release_date": "2025-08-21",
      "title": "Eenie Meanie",
      "video": false,
      "vote_average": 6.7,
      "vote_count": 73
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/eU7IfdWq8KQy0oNd4kKXS0QUR08.jpg",
      "genre_ids": [
        878,
        12,
        28
      ],
      "id": 1061474,
      "original_language": "en",
      "original_title": "Superman",
      "overview": "Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.",
      "popularity": 730.4985,
      "poster_path": "https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg",
      "release_date": "2025-07-09",
      "title": "Superman",
      "video": false,
      "vote_average": 7.557,
      "vote_count": 2671
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/538U9snNc2fpnOmYXAPUh3zn31H.jpg",
      "genre_ids": [
        28,
        12,
        53
      ],
      "id": 575265,
      "original_language": "en",
      "original_title": "Mission: Impossible - The Final Reckoning",
      "overview": "Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world's governments and a mysterious ghost from Hunt's past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.",
      "popularity": 663.246,
      "poster_path": "https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
      "release_date": "2025-05-17",
      "title": "Mission: Impossible - The Final Reckoning",
      "video": false,
      "vote_average": 7.246,
      "vote_count": 1429
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg",
      "genre_ids": [
        878,
        12,
        28
      ],
      "id": 1234821,
      "original_language": "en",
      "original_title": "Jurassic World Rebirth",
      "overview": "Five years after the events of Jurassic World Dominion, covert operations expert Zora Bennett is contracted to lead a skilled team on a top-secret mission to secure genetic material from the world's three most massive dinosaurs. When Zora's operation intersects with a civilian family whose boating expedition was capsized, they all find themselves stranded on an island where they come face-to-face with a sinister, shocking discovery that's been hidden from the world for decades.",
      "popularity": 545.6949,
      "poster_path": "https://image.tmdb.org/t/p/w500/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg",
      "release_date": "2025-07-01",
      "title": "Jurassic World Rebirth",
      "video": false,
      "vote_average": 6.366,
      "vote_count": 1846
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/1RgPyOhN4DRs225BGTlHJqCudII.jpg",
      "genre_ids": [
        16,
        28,
        14,
        53
      ],
      "id": 1311031,
      "original_language": "ja",
      "original_title": "劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来",
      "overview": "The Demon Slayer Corps are drawn into the Infinity Castle, where Tanjiro, Nezuko, and the Hashira face terrifying Upper Rank demons in a desperate fight as the final battle against Muzan Kibutsuji begins.",
      "popularity": 478.7473,
      "poster_path": "https://image.tmdb.org/t/p/w500/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg",
      "release_date": "2025-07-18",
      "title": "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
      "video": false,
      "vote_average": 7.199,
      "vote_count": 93
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/kYsU56QEcwEr8jAQ6Vm3M8bXTWz.jpg",
      "genre_ids": [
        28,
        35,
        18,
        37
      ],
      "id": 1429739,
      "original_language": "th",
      "original_title": "เขาชุมทอง คะนองชุมโจร",
      "overview": "At the tail end of World War II, a bandit leader and his crew go up against his sworn enemy and the Japanese army to rob a train full of gold.",
      "popularity": 456.9866,
      "poster_path": "https://image.tmdb.org/t/p/w500/7j6jZNhCTnsZy5QItpruDwyBWoo.jpg",
      "release_date": "2025-08-19",
      "title": "Gold Rush Gang",
      "video": false,
      "vote_average": 6.531,
      "vote_count": 16
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/jvpkBenB6hv19WWYVlaiow8zklq.jpg",
      "genre_ids": [
        16,
        10751,
        35,
        80,
        12
      ],
      "id": 1175942,
      "original_language": "en",
      "original_title": "The Bad Guys 2",
      "overview": "The now-reformed Bad Guys are trying (very, very hard) to be good, but instead find themselves hijacked into a high-stakes, globe-trotting heist, masterminded by a new team of criminals they never saw coming: The Bad Girls.",
      "popularity": 460.3463,
      "poster_path": "https://image.tmdb.org/t/p/w500/26oSPnq0ct59l07QOXZKyzsiRtN.jpg",
      "release_date": "2025-07-24",
      "title": "The Bad Guys 2",
      "video": false,
      "vote_average": 7.8,
      "vote_count": 243
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/yth78N88nwokepnOe5atwPGfTL1.jpg",
      "genre_ids": [
        28,
        80,
        53
      ],
      "id": 1382406,
      "original_language": "zh",
      "original_title": "惊天大营救",
      "overview": "A veteran Muay Thai expert goes on a take-no-prisoners mission of revenge after his wife and daughter are brutally murdered by mysterious forces.",
      "popularity": 433.5116,
      "poster_path": "https://image.tmdb.org/t/p/w500/jInS9RXbXN2lUxQXYYKSedvKfQi.jpg",
      "release_date": "2024-12-05",
      "title": "Striking Rescue",
      "video": false,
      "vote_average": 7.646,
      "vote_count": 89
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/u3Cfe21Cmv5cWs5VnFCz15HdfKO.jpg",
      "genre_ids": [
        27
      ],
      "id": 1389158,
      "original_language": "hi",
      "original_title": "माँ",
      "overview": "A mother and daughter encounter a demon in a village where girls have been disappearing.",
      "popularity": 409.419,
      "poster_path": "https://image.tmdb.org/t/p/w500/kc5n7LJUmvBsVxzAla1ONN8kouP.jpg",
      "release_date": "2025-06-20",
      "title": "Maa",
      "video": false,
      "vote_average": 6.8,
      "vote_count": 15
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/lWeaB9S77Os7VHOt8GH5JdfrBX3.jpg",
      "genre_ids": [
        16,
        10751,
        35,
        12,
        878
      ],
      "id": 1022787,
      "original_language": "en",
      "original_title": "Elio",
      "overview": "Elio, a space fanatic with an active imagination, finds himself on a cosmic misadventure where he must form new bonds with eccentric alien lifeforms, navigate a crisis of intergalactic proportions and somehow discover who he is truly meant to be.",
      "popularity": 385.3926,
      "poster_path": "https://image.tmdb.org/t/p/w500/w2ARwtc1zoh0pyfwmyhpZHwuXgK.jpg",
      "release_date": "2025-06-18",
      "title": "Elio",
      "video": false,
      "vote_average": 6.966,
      "vote_count": 351
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/qEFTuoFIAwrnVn7IsvE8RVt2TK3.jpg",
      "genre_ids": [
        14,
        10751,
        28,
        12
      ],
      "id": 1087192,
      "original_language": "en",
      "original_title": "How to Train Your Dragon",
      "overview": "On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.",
      "popularity": 385.334,
      "poster_path": "https://image.tmdb.org/t/p/w500/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg",
      "release_date": "2025-06-06",
      "title": "How to Train Your Dragon",
      "video": false,
      "vote_average": 8.028,
      "vote_count": 1751
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/l3ycQYwWmbz7p8otwbomFDXIEhn.jpg",
      "genre_ids": [
        16,
        10402,
        14,
        35
      ],
      "id": 803796,
      "original_language": "en",
      "original_title": "KPop Demon Hunters",
      "overview": "When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're using their secret powers to protect their fans from supernatural threats.",
      "popularity": 363.5235,
      "poster_path": "https://image.tmdb.org/t/p/w500/22AouvwlhlXbe3nrFcjzL24bvWH.jpg",
      "release_date": "2025-06-20",
      "title": "KPop Demon Hunters",
      "video": false,
      "vote_average": 8.408,
      "vote_count": 1131
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/kyqM6padQzZ1eYxv84i9smNvZAG.jpg",
      "genre_ids": [
        27,
        9648
      ],
      "id": 1078605,
      "original_language": "en",
      "original_title": "Weapons",
      "overview": "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.",
      "popularity": 349.2693,
      "poster_path": "https://image.tmdb.org/t/p/w500/cpf7vsRZ0MYRQcnLWteD5jK9ymT.jpg",
      "release_date": "2025-08-04",
      "title": "Weapons",
      "video": false,
      "vote_average": 7.477,
      "vote_count": 636
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/ySHUoK4utUOiSfCinw81H1TsV0E.jpg",
      "genre_ids": [
        878,
        28,
        27
      ],
      "id": 1241470,
      "original_language": "en",
      "original_title": "Osiris",
      "overview": "Special Forces commandos on a mission are abducted mid-operation by a mysterious spacecraft. Upon waking aboard, they find themselves prey to a relentless alien race in a fight for survival.",
      "popularity": 339.0825,
      "poster_path": "https://image.tmdb.org/t/p/w500/3YtZHtXPNG5AleisgEatEfZOT2w.jpg",
      "release_date": "2025-07-25",
      "title": "Osiris",
      "video": false,
      "vote_average": 6.587,
      "vote_count": 98
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/gVPjIcYo1gTaACF43OMsralrcUS.jpg",
      "genre_ids": [
        27,
        9648,
        53,
        28,
        12
      ],
      "id": 1083433,
      "original_language": "en",
      "original_title": "I Know What You Did Last Summer",
      "overview": "When five friends inadvertently cause a deadly car accident, they cover up their involvement and make a pact to keep it a secret rather than face the consequences. A year later, their past comes back to haunt them and they're forced to confront a horrifying truth: someone knows what they did last summer…and is hell-bent on revenge.",
      "popularity": 431.3138,
      "poster_path": "https://image.tmdb.org/t/p/w500/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg",
      "release_date": "2025-07-16",
      "title": "I Know What You Did Last Summer",
      "video": false,
      "vote_average": 6,
      "vote_count": 177
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/mOcMPfCJEvSREq8OZzg42gFgrGt.jpg",
      "genre_ids": [
        10749,
        53
      ],
      "id": 1300116,
      "original_language": "de",
      "original_title": "Fall for Me",
      "overview": "Lilli is suspicious of her sister's new fiance, but when an attractive stranger enters her life, she's suddenly distracted by the thralls of desire.",
      "popularity": 162.9243,
      "poster_path": "https://image.tmdb.org/t/p/w500/nLTs9SNBuk3DuB8D0p3mSsPYN7J.jpg",
      "release_date": "2025-08-20",
      "title": "Fall for Me",
      "video": false,
      "vote_average": 6.01,
      "vote_count": 49
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/fBlzTwgtbDYkDKlhnPu69jHfVGy.jpg",
      "genre_ids": [
        27,
        10749
      ],
      "id": 1242011,
      "original_language": "en",
      "original_title": "Together",
      "overview": "With a move to the countryside already testing the limits of a couple's relationship, a supernatural encounter begins an extreme transformation of their love, their lives, and their flesh.",
      "popularity": 434.5767,
      "poster_path": "https://image.tmdb.org/t/p/w500/m52XidzKx94bKlToZfEXUnL3pdy.jpg",
      "release_date": "2025-07-23",
      "title": "Together",
      "video": false,
      "vote_average": 7.177,
      "vote_count": 236
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/38yqp1vsaGt11T713W4TzCrjstn.jpg",
      "genre_ids": [
        18,
        10749
      ],
      "id": 1506456,
      "original_language": "tl",
      "original_title": "Maalikaya",
      "overview": "Kara, a young inmate who unleashes her hidden sexual fantasies while serving time. After meeting Lila, a seductive inmate played by Jenn Rosa, Kara finds a new purpose in life. But her dark past still haunts her even behind bars.",
      "popularity": 70.4357,
      "poster_path": "https://image.tmdb.org/t/p/w500/vkzyTpOYbeEWZkHFCBtqLiJ7b4U.jpg",
      "release_date": "2025-07-25",
      "title": "Maalikaya",
      "video": false,
      "vote_average": 6.3,
      "vote_count": 3
    }
  ],
  "total_pages": 52146,
  "total_results": 1042919
}


Name	Description
page
integer
(query)
Page number

1


curl -X 'GET' \
  'http://localhost:3000/api/movies/top-rated?page=1' \
  -H 'accept: */*'


{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/pNjh59JSxChQktamG3LMp9ZoQzp.jpg",
      "genre_ids": [
        18,
        80
      ],
      "id": 278,
      "original_language": "en",
      "original_title": "The Shawshank Redemption",
      "overview": "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
      "popularity": 28.138,
      "poster_path": "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      "release_date": "1994-09-23",
      "title": "The Shawshank Redemption",
      "video": false,
      "vote_average": 8.712,
      "vote_count": 28778
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/htuuuEwAvDVECMpb0ltLLyZyDDt.jpg",
      "genre_ids": [
        18,
        80
      ],
      "id": 238,
      "original_language": "en",
      "original_title": "The Godfather",
      "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
      "popularity": 25.8674,
      "poster_path": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      "release_date": "1972-03-14",
      "title": "The Godfather",
      "video": false,
      "vote_average": 8.686,
      "vote_count": 21766
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
      "genre_ids": [
        18,
        80
      ],
      "id": 240,
      "original_language": "en",
      "original_title": "The Godfather Part II",
      "overview": "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
      "popularity": 15.1316,
      "poster_path": "https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
      "release_date": "1974-12-20",
      "title": "The Godfather Part II",
      "video": false,
      "vote_average": 8.571,
      "vote_count": 13141
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
      "genre_ids": [
        18,
        36,
        10752
      ],
      "id": 424,
      "original_language": "en",
      "original_title": "Schindler's List",
      "overview": "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
      "popularity": 13.0564,
      "poster_path": "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
      "release_date": "1993-12-15",
      "title": "Schindler's List",
      "video": false,
      "vote_average": 8.565,
      "vote_count": 16659
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/bxgTSUenZDHNFerQ1whRKplrMKF.jpg",
      "genre_ids": [
        18
      ],
      "id": 389,
      "original_language": "en",
      "original_title": "12 Angry Men",
      "overview": "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
      "popularity": 15.7736,
      "poster_path": "https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
      "release_date": "1957-04-10",
      "title": "12 Angry Men",
      "video": false,
      "vote_average": 8.548,
      "vote_count": 9352
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/ukfI9QkU1aIhOhKXYWE9n3z1mFR.jpg",
      "genre_ids": [
        16,
        10751,
        14
      ],
      "id": 129,
      "original_language": "ja",
      "original_title": "千と千尋の神隠し",
      "overview": "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
      "popularity": 34.6602,
      "poster_path": "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
      "release_date": "2001-07-20",
      "title": "Spirited Away",
      "video": false,
      "vote_average": 8.534,
      "vote_count": 17418
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/enNubozHn9pXi0ycTVYUWfpHZm.jpg",
      "genre_ids": [
        18,
        28,
        80,
        53
      ],
      "id": 155,
      "original_language": "en",
      "original_title": "The Dark Knight",
      "overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
      "popularity": 30.1523,
      "poster_path": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      "release_date": "2008-07-16",
      "title": "The Dark Knight",
      "video": false,
      "vote_average": 8.522,
      "vote_count": 34290
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg",
      "genre_ids": [
        35,
        18,
        10749
      ],
      "id": 19404,
      "original_language": "hi",
      "original_title": "दिलवाले दुल्हनिया ले जायेंगे",
      "overview": "Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.",
      "popularity": 6.9997,
      "poster_path": "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
      "release_date": "1995-10-20",
      "title": "Dilwale Dulhania Le Jayenge",
      "video": false,
      "vote_average": 8.515,
      "vote_count": 4505
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/vxJ08SvwomfKbpboCWynC3uqUg4.jpg",
      "genre_ids": [
        14,
        18,
        80
      ],
      "id": 497,
      "original_language": "en",
      "original_title": "The Green Mile",
      "overview": "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution.",
      "popularity": 16.0712,
      "poster_path": "https://image.tmdb.org/t/p/w500/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
      "release_date": "1999-12-10",
      "title": "The Green Mile",
      "video": false,
      "vote_average": 8.503,
      "vote_count": 18317
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
      "genre_ids": [
        35,
        53,
        18
      ],
      "id": 496243,
      "original_language": "ko",
      "original_title": "기생충",
      "overview": "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
      "popularity": 18.139,
      "poster_path": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      "release_date": "2019-05-30",
      "title": "Parasite",
      "video": false,
      "vote_average": 8.498,
      "vote_count": 19405
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
      "genre_ids": [
        12,
        14,
        28
      ],
      "id": 122,
      "original_language": "en",
      "original_title": "The Lord of the Rings: The Return of the King",
      "overview": "As armies mass for a final battle that will decide the fate of the world--and powerful, ancient forces of Light and Dark compete to determine the outcome--one member of the Fellowship of the Ring is revealed as the noble heir to the throne of the Kings of Men. Yet, the sole hope for triumph over evil lies with a brave hobbit, Frodo, who, accompanied by his loyal friend Sam and the hideous, wretched Gollum, ventures deep into the very dark heart of Mordor on his seemingly impossible quest to destroy the Ring of Power.​",
      "popularity": 21.7804,
      "poster_path": "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
      "release_date": "2003-12-17",
      "title": "The Lord of the Rings: The Return of the King",
      "video": false,
      "vote_average": 8.488,
      "vote_count": 25390
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
      "genre_ids": [
        53,
        80,
        35,
        18
      ],
      "id": 680,
      "original_language": "en",
      "original_title": "Pulp Fiction",
      "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
      "popularity": 18.4286,
      "poster_path": "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
      "release_date": "1994-09-10",
      "title": "Pulp Fiction",
      "video": false,
      "vote_average": 8.487,
      "vote_count": 29005
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/8x9iKH8kWA0zdkgNdpAew7OstYe.jpg",
      "genre_ids": [
        16,
        10749,
        18
      ],
      "id": 372058,
      "original_language": "ja",
      "original_title": "君の名は。",
      "overview": "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
      "popularity": 15.5346,
      "poster_path": "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
      "release_date": "2016-08-26",
      "title": "Your Name.",
      "video": false,
      "vote_average": 8.5,
      "vote_count": 11937
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/x4biAVdPVCghBlsVIzB6NmbghIz.jpg",
      "genre_ids": [
        37
      ],
      "id": 429,
      "original_language": "it",
      "original_title": "Il buono, il brutto, il cattivo",
      "overview": "While the Civil War rages on between the Union and the Confederacy, three men – a quiet loner, a ruthless hitman, and a Mexican bandit – comb the American Southwest in search of a strongbox containing $200,000 in stolen gold.",
      "popularity": 12.5004,
      "poster_path": "https://image.tmdb.org/t/p/w500/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
      "release_date": "1966-12-22",
      "title": "The Good, the Bad and the Ugly",
      "video": false,
      "vote_average": 8.465,
      "vote_count": 9134
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/67HggiWaP9ZLv5sPYmyRV37yAJM.jpg",
      "genre_ids": [
        35,
        18,
        10749
      ],
      "id": 13,
      "original_language": "en",
      "original_title": "Forrest Gump",
      "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
      "popularity": 17.4088,
      "poster_path": "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      "release_date": "1994-06-23",
      "title": "Forrest Gump",
      "video": false,
      "vote_average": 8.465,
      "vote_count": 28557
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/vgnoBSVzWAV9sNQUORaDGvDp7wx.jpg",
      "genre_ids": [
        12,
        18,
        878
      ],
      "id": 157336,
      "original_language": "en",
      "original_title": "Interstellar",
      "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
      "popularity": 42.3136,
      "poster_path": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      "release_date": "2014-11-05",
      "title": "Interstellar",
      "video": false,
      "vote_average": 8.46,
      "vote_count": 37719
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/qvZ91FwMq6O47VViAr8vZNQz3WI.jpg",
      "genre_ids": [
        28,
        18
      ],
      "id": 346,
      "original_language": "ja",
      "original_title": "七人の侍",
      "overview": "A samurai answers a village's request for protection after he falls on hard times. The town needs protection from bandits, so the samurai gathers six others to help him teach the people how to defend themselves, and the villagers provide the soldiers with food.",
      "popularity": 6.6642,
      "poster_path": "https://image.tmdb.org/t/p/w500/lOMGc8bnSwQhS4XyE1S99uH8NXf.jpg",
      "release_date": "1954-04-26",
      "title": "Seven Samurai",
      "video": false,
      "vote_average": 8.456,
      "vote_count": 3968
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/7TF4p86ZafnxFuNqWdhpHXFO244.jpg",
      "genre_ids": [
        18,
        80
      ],
      "id": 769,
      "original_language": "en",
      "original_title": "GoodFellas",
      "overview": "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.",
      "popularity": 12.9427,
      "poster_path": "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
      "release_date": "1990-09-12",
      "title": "GoodFellas",
      "video": false,
      "vote_average": 8.455,
      "vote_count": 13572
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/dlC0ed9Ugh3FzydnkBtV5lRXUu4.jpg",
      "genre_ids": [
        16,
        18,
        10752
      ],
      "id": 12477,
      "original_language": "ja",
      "original_title": "火垂るの墓",
      "overview": "In the final months of World War II, 14-year-old Seita and his sister Setsuko are orphaned when their mother is killed during an air raid in Kobe, Japan. After a falling out with their aunt, they move into an abandoned bomb shelter. With no surviving relatives and their emergency rations depleted, Seita and Setsuko struggle to survive.",
      "popularity": 0.0086,
      "poster_path": "https://image.tmdb.org/t/p/w500/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg",
      "release_date": "1988-04-16",
      "title": "Grave of the Fireflies",
      "video": false,
      "vote_average": 8.449,
      "vote_count": 6021
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/6aNKD81RHR1DqUUa8kOZ1TBY1Lp.jpg",
      "genre_ids": [
        35,
        18
      ],
      "id": 637,
      "original_language": "it",
      "original_title": "La vita è bella",
      "overview": "A touching story of an Italian book seller of Jewish ancestry who lives in his own little fairy tale. His creative and happy life would come to an abrupt halt when his entire family is deported to a concentration camp during World War II. While locked up he tries to convince his son that the whole thing is just a game.",
      "popularity": 8.7488,
      "poster_path": "https://image.tmdb.org/t/p/w500/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg",
      "release_date": "1997-12-20",
      "title": "Life Is Beautiful",
      "video": false,
      "vote_average": 8.442,
      "vote_count": 13501
    }
  ],
  "total_pages": 516,
  "total_results": 10308
}


Name	Description
page
integer
(query)
Page number

1


curl -X 'GET' \
  'http://localhost:3000/api/movies/now-playing?page=1' \
  -H 'accept: */*'


{
  "dates": {
    "maximum": "2025-09-03",
    "minimum": "2025-07-23"
  },
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/iZLqwEwUViJdSkGVjePGhxYzbDb.jpg",
      "genre_ids": [
        878,
        53
      ],
      "id": 755898,
      "original_language": "en",
      "original_title": "War of the Worlds",
      "overview": "Will Radford is a top analyst for Homeland Security who tracks potential threats through a mass surveillance program, until one day an attack by an unknown entity leads him to question whether the government is hiding something from him... and from the rest of the world.",
      "popularity": 1173.9925,
      "poster_path": "https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg",
      "release_date": "2025-07-29",
      "title": "War of the Worlds",
      "video": false,
      "vote_average": 4.249,
      "vote_count": 419
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/ZtcGMc204JsNqfjS9lU6udRgpo.jpg",
      "genre_ids": [
        28,
        18
      ],
      "id": 911430,
      "original_language": "en",
      "original_title": "F1",
      "overview": "Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.",
      "popularity": 975.1859,
      "poster_path": "https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg",
      "release_date": "2025-06-25",
      "title": "F1",
      "video": false,
      "vote_average": 7.802,
      "vote_count": 1543
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/xk0ck8qmYmevisTmphWIDm1g43p.jpg",
      "genre_ids": [
        53,
        28,
        35
      ],
      "id": 1151334,
      "original_language": "en",
      "original_title": "Eenie Meanie",
      "overview": "A former teenage getaway driver gets dragged back into her unsavory past when a former employer offers her a chance to save the life of her chronically unreliable ex-boyfriend.",
      "popularity": 822.4163,
      "poster_path": "https://image.tmdb.org/t/p/w500/12Va3oO3oYUdOd75zM57Nx1976a.jpg",
      "release_date": "2025-08-21",
      "title": "Eenie Meanie",
      "video": false,
      "vote_average": 6.729,
      "vote_count": 72
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/zNriRTr0kWwyaXPzdg1EIxf0BWk.jpg",
      "genre_ids": [
        878,
        12,
        28
      ],
      "id": 1234821,
      "original_language": "en",
      "original_title": "Jurassic World Rebirth",
      "overview": "Five years after the events of Jurassic World Dominion, covert operations expert Zora Bennett is contracted to lead a skilled team on a top-secret mission to secure genetic material from the world's three most massive dinosaurs. When Zora's operation intersects with a civilian family whose boating expedition was capsized, they all find themselves stranded on an island where they come face-to-face with a sinister, shocking discovery that's been hidden from the world for decades.",
      "popularity": 545.6949,
      "poster_path": "https://image.tmdb.org/t/p/w500/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg",
      "release_date": "2025-07-01",
      "title": "Jurassic World Rebirth",
      "video": false,
      "vote_average": 6.366,
      "vote_count": 1842
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/1RgPyOhN4DRs225BGTlHJqCudII.jpg",
      "genre_ids": [
        16,
        28,
        14,
        53
      ],
      "id": 1311031,
      "original_language": "ja",
      "original_title": "劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来",
      "overview": "The Demon Slayer Corps are drawn into the Infinity Castle, where Tanjiro, Nezuko, and the Hashira face terrifying Upper Rank demons in a desperate fight as the final battle against Muzan Kibutsuji begins.",
      "popularity": 478.7473,
      "poster_path": "https://image.tmdb.org/t/p/w500/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg",
      "release_date": "2025-07-18",
      "title": "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
      "video": false,
      "vote_average": 7.2,
      "vote_count": 92
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/kYsU56QEcwEr8jAQ6Vm3M8bXTWz.jpg",
      "genre_ids": [
        28,
        35,
        18,
        37
      ],
      "id": 1429739,
      "original_language": "th",
      "original_title": "เขาชุมทอง คะนองชุมโจร",
      "overview": "At the tail end of World War II, a bandit leader and his crew go up against his sworn enemy and the Japanese army to rob a train full of gold.",
      "popularity": 456.9866,
      "poster_path": "https://image.tmdb.org/t/p/w500/7j6jZNhCTnsZy5QItpruDwyBWoo.jpg",
      "release_date": "2025-08-19",
      "title": "Gold Rush Gang",
      "video": false,
      "vote_average": 6.531,
      "vote_count": 16
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/jvpkBenB6hv19WWYVlaiow8zklq.jpg",
      "genre_ids": [
        16,
        10751,
        35,
        80,
        12
      ],
      "id": 1175942,
      "original_language": "en",
      "original_title": "The Bad Guys 2",
      "overview": "The now-reformed Bad Guys are trying (very, very hard) to be good, but instead find themselves hijacked into a high-stakes, globe-trotting heist, masterminded by a new team of criminals they never saw coming: The Bad Girls.",
      "popularity": 460.3463,
      "poster_path": "https://image.tmdb.org/t/p/w500/26oSPnq0ct59l07QOXZKyzsiRtN.jpg",
      "release_date": "2025-07-24",
      "title": "The Bad Guys 2",
      "video": false,
      "vote_average": 7.8,
      "vote_count": 243
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/l3ycQYwWmbz7p8otwbomFDXIEhn.jpg",
      "genre_ids": [
        16,
        10402,
        14,
        35
      ],
      "id": 803796,
      "original_language": "en",
      "original_title": "KPop Demon Hunters",
      "overview": "When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're using their secret powers to protect their fans from supernatural threats.",
      "popularity": 363.5235,
      "poster_path": "https://image.tmdb.org/t/p/w500/22AouvwlhlXbe3nrFcjzL24bvWH.jpg",
      "release_date": "2025-06-20",
      "title": "KPop Demon Hunters",
      "video": false,
      "vote_average": 8.408,
      "vote_count": 1131
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/kyqM6padQzZ1eYxv84i9smNvZAG.jpg",
      "genre_ids": [
        27,
        9648
      ],
      "id": 1078605,
      "original_language": "en",
      "original_title": "Weapons",
      "overview": "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.",
      "popularity": 349.2693,
      "poster_path": "https://image.tmdb.org/t/p/w500/cpf7vsRZ0MYRQcnLWteD5jK9ymT.jpg",
      "release_date": "2025-08-04",
      "title": "Weapons",
      "video": false,
      "vote_average": 7.5,
      "vote_count": 634
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/ySHUoK4utUOiSfCinw81H1TsV0E.jpg",
      "genre_ids": [
        878,
        28,
        27
      ],
      "id": 1241470,
      "original_language": "en",
      "original_title": "Osiris",
      "overview": "Special Forces commandos on a mission are abducted mid-operation by a mysterious spacecraft. Upon waking aboard, they find themselves prey to a relentless alien race in a fight for survival.",
      "popularity": 339.0825,
      "poster_path": "https://image.tmdb.org/t/p/w500/3YtZHtXPNG5AleisgEatEfZOT2w.jpg",
      "release_date": "2025-07-25",
      "title": "Osiris",
      "video": false,
      "vote_average": 6.587,
      "vote_count": 98
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/gVPjIcYo1gTaACF43OMsralrcUS.jpg",
      "genre_ids": [
        27,
        9648,
        53,
        28,
        12
      ],
      "id": 1083433,
      "original_language": "en",
      "original_title": "I Know What You Did Last Summer",
      "overview": "When five friends inadvertently cause a deadly car accident, they cover up their involvement and make a pact to keep it a secret rather than face the consequences. A year later, their past comes back to haunt them and they're forced to confront a horrifying truth: someone knows what they did last summer…and is hell-bent on revenge.",
      "popularity": 431.3138,
      "poster_path": "https://image.tmdb.org/t/p/w500/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg",
      "release_date": "2025-07-16",
      "title": "I Know What You Did Last Summer",
      "video": false,
      "vote_average": 6,
      "vote_count": 175
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/mOcMPfCJEvSREq8OZzg42gFgrGt.jpg",
      "genre_ids": [
        10749,
        53
      ],
      "id": 1300116,
      "original_language": "de",
      "original_title": "Fall for Me",
      "overview": "Lilli is suspicious of her sister's new fiance, but when an attractive stranger enters her life, she's suddenly distracted by the thralls of desire.",
      "popularity": 162.9243,
      "poster_path": "https://image.tmdb.org/t/p/w500/nLTs9SNBuk3DuB8D0p3mSsPYN7J.jpg",
      "release_date": "2025-08-20",
      "title": "Fall for Me",
      "video": false,
      "vote_average": 6.01,
      "vote_count": 49
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/fBlzTwgtbDYkDKlhnPu69jHfVGy.jpg",
      "genre_ids": [
        27,
        10749
      ],
      "id": 1242011,
      "original_language": "en",
      "original_title": "Together",
      "overview": "With a move to the countryside already testing the limits of a couple's relationship, a supernatural encounter begins an extreme transformation of their love, their lives, and their flesh.",
      "popularity": 434.5767,
      "poster_path": "https://image.tmdb.org/t/p/w500/m52XidzKx94bKlToZfEXUnL3pdy.jpg",
      "release_date": "2025-07-23",
      "title": "Together",
      "video": false,
      "vote_average": 7.2,
      "vote_count": 235
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/38yqp1vsaGt11T713W4TzCrjstn.jpg",
      "genre_ids": [
        18,
        10749
      ],
      "id": 1506456,
      "original_language": "tl",
      "original_title": "Maalikaya",
      "overview": "Kara, a young inmate who unleashes her hidden sexual fantasies while serving time. After meeting Lila, a seductive inmate played by Jenn Rosa, Kara finds a new purpose in life. But her dark past still haunts her even behind bars.",
      "popularity": 70.4357,
      "poster_path": "https://image.tmdb.org/t/p/w500/vkzyTpOYbeEWZkHFCBtqLiJ7b4U.jpg",
      "release_date": "2025-07-25",
      "title": "Maalikaya",
      "video": false,
      "vote_average": 6.3,
      "vote_count": 3
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/nZsKWhwhUL3Eg88SkIaJjuIZzpN.jpg",
      "genre_ids": [
        28,
        35,
        53
      ],
      "id": 1319895,
      "original_language": "en",
      "original_title": "Hostile Takeover",
      "overview": "Follows Pete, a professional hitman, as he faces a group of assassins after the boss of a crime syndicate suspects disloyalty due to his attendance at Workaholics Anonymous meetings.",
      "popularity": 306.5045,
      "poster_path": "https://image.tmdb.org/t/p/w500/vntwlS3CAKfoLTs90GaoK6lymBC.jpg",
      "release_date": "2025-08-08",
      "title": "Hostile Takeover",
      "video": false,
      "vote_average": 7.455,
      "vote_count": 22
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/s94NjfKkcSczZ1FembwmQZwsuwY.jpg",
      "genre_ids": [
        878,
        12
      ],
      "id": 617126,
      "original_language": "en",
      "original_title": "The Fantastic 4: First Steps",
      "overview": "Against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel's First Family is forced to balance their roles as heroes with the strength of their family bond, while defending Earth from a ravenous space god called Galactus and his enigmatic Herald, Silver Surfer.",
      "popularity": 136.939,
      "poster_path": "https://image.tmdb.org/t/p/w500/x26MtUlwtWD26d0G0FXcppxCJio.jpg",
      "release_date": "2025-07-23",
      "title": "The Fantastic 4: First Steps",
      "video": false,
      "vote_average": 7.218,
      "vote_count": 1121
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/iZztGzckOMByRRQgsFh2yk3udkU.jpg",
      "genre_ids": [
        28,
        27,
        10749
      ],
      "id": 986206,
      "original_language": "en",
      "original_title": "Night Carnage",
      "overview": "A blogger who is also a werewolf meets a dashing playboy with a dark secret of his own. Starring Logan Andrews and Christian Howard.",
      "popularity": 128.3086,
      "poster_path": "https://image.tmdb.org/t/p/w500/w0wjPQKhlqisSbylf1sWZiNyc2h.jpg",
      "release_date": "2025-07-29",
      "title": "Night Carnage",
      "video": false,
      "vote_average": 5.905,
      "vote_count": 42
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/1DTIRhw4cpLJlHlrPPbKzq6amHc.jpg",
      "genre_ids": [
        28,
        18,
        36
      ],
      "id": 1185528,
      "original_language": "zh",
      "original_title": "射雕英雄传：侠之大者",
      "overview": "Under Genghis Khan, the Mongolian army pushes west to destroy the Jin Dynasty, setting its sights on the Song Dynasty next. Amid internal conflicts among martial arts schools, Guo Jing unites the Central Plains' warriors to defend Xiangyang, embodying courage and loyalty in the fight for the nation.",
      "popularity": 120.4011,
      "poster_path": "https://image.tmdb.org/t/p/w500/fUCFEGFlMIFet9ja72JDAeG1he8.jpg",
      "release_date": "2025-01-29",
      "title": "Legends of the Condor Heroes: The Gallants",
      "video": false,
      "vote_average": 6.7,
      "vote_count": 57
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/c9xmB53umjnrCMS4pZz11clF3yJ.jpg",
      "genre_ids": [
        16,
        14,
        12,
        28
      ],
      "id": 980477,
      "original_language": "zh",
      "original_title": "哪吒之魔童闹海",
      "overview": "After a catastrophic event leaves their bodies destroyed, Ne Zha and Ao Bing are granted a fragile second chance at life. As tensions rise between the dragon clans and celestial forces, the two must undergo a series of perilous trials that will test their bond, challenge their identities, and decide the fate of both mortals and immortals.",
      "popularity": 117.9681,
      "poster_path": "https://image.tmdb.org/t/p/w500/cb5NyNrqiCNNoDkA8FfxHAtypdG.jpg",
      "release_date": "2025-01-29",
      "title": "Ne Zha 2",
      "video": false,
      "vote_average": 8,
      "vote_count": 319
    },
    {
      "adult": false,
      "backdrop_path": "https://image.tmdb.org/t/p/w500/y7tjLYcq2ZGy2DNG0ODhGX9Tm60.jpg",
      "genre_ids": [
        28,
        35,
        80
      ],
      "id": 1106289,
      "original_language": "en",
      "original_title": "The Pickup",
      "overview": "A routine cash pickup takes a wild turn when mismatched armored truck drivers Russell and Travis are ambushed by ruthless criminals led by savvy mastermind Zoe.",
      "popularity": 112.1843,
      "poster_path": "https://image.tmdb.org/t/p/w500/vFWvWhfAvij8UIngg2Vf6JV95Cr.jpg",
      "release_date": "2025-07-27",
      "title": "The Pickup",
      "video": false,
      "vote_average": 6.523,
      "vote_count": 301
    }
  ],
  "total_pages": 207,
  "total_results": 4128
}


Name	Description
id *
integer
(path)
Movie ID  437


curl -X 'GET' \
  'http://localhost:3000/api/movies/437' \
  -H 'accept: */*'

{
  "adult": false,
  "backdrop_path": "https://image.tmdb.org/t/p/w500/zJqv6s4XCdHWrnoqfLqlGzzxSjH.jpg",
  "belongs_to_collection": {
    "id": 432,
    "name": "Cube Collection",
    "poster_path": "/jnv92kJUH28wb61dhVjAbzhv5EX.jpg",
    "backdrop_path": "/4SdZhO4M5vJ48dqp7r8PieZ37RJ.jpg"
  },
  "budget": 0,
  "genres": [
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 9648,
      "name": "Mystery"
    }
  ],
  "homepage": "",
  "id": 437,
  "imdb_id": "tt0285492",
  "origin_country": [
    "CA",
    "US"
  ],
  "original_language": "en",
  "original_title": "Cube 2: Hypercube",
  "overview": "Eight strangers awaken with no memory, in a puzzling cube-shaped room where the laws of physics do not always apply.",
  "popularity": 2.2376,
  "poster_path": "https://image.tmdb.org/t/p/w500/bEqqwtwUP7lm56VyeVONhv9JtYu.jpg",
  "production_companies": [
    {
      "id": 35,
      "logo_path": "/wxrHa3nZ1K4zo65p56991INkGo6.png",
      "name": "Lions Gate Films",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "CA",
      "name": "Canada"
    }
  ],
  "release_date": "2002-04-15",
  "revenue": 3563603,
  "runtime": 94,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "There is more to fear than you can see.",
  "title": "Cube 2: Hypercube",
  "video": false,
  "vote_average": 5.497,
  "vote_count": 1513
}