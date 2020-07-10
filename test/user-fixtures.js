function makeUsersArray() {
  return [
    {
      id: 1,
      user_email: 'jtliner925@gmail.com',
      user_password: 'jtlagleel',
      first_name: 'JT',
      last_name: 'Liner',
      user_address: '309 Tallwood Dr',
      user_bio: 'Man, this is a really long story, how much time do you have?',
    },
    {
      id: 2,
      user_email: 'christyaliner@gmail.com',
      user_password: 'Jtlagleel1@',
      first_name: 'Christy',
      last_name: 'Liner',
      user_address: '309 Tallwood Dr',
      user_bio: 'I love to smile!',
    },
    {
      id: 3,
      user_email: 'tyler.smith3@bswhealth.org',
      user_password: 'jtlagleel',
      first_name: 'Tyler',
      last_name: 'Smith',
      user_address: '30216 St Andrews Dr',
      user_bio: 'A really cool guy',
    },
  ]
}

function makeGroupsArray() {
  return [
    {
      id:1,
      group_name:'Dirt',
      pitch:'Things get messy',
      leader_phone: '555-765-9999',
      group_leader: null ,
      group_location: 'at the chick-fil-a',
      time_date: 'friday at 5pm',
      more_info: 'nothing here',
      user_ids: [ '1' ],
    },
    {
      id: 2,
      group_name: 'Water',
      pitch: 'slippery',
      leader_phone: '888-987-2323',
      group_leader: null,
      group_location: 'in my backyard',
      time_date: 'monday at 2pm',
      more_info: 'slip and slide',
      user_ids: [ '2' ],
    },
    {
      id: 3,
      group_name: 'Fire',
      pitch:'White Hot',
      leader_phone: '342-543-6789',
      group_leader: null ,
      group_location: 'Fire department',
      time_date:'7pm on Wednesday',
      more_info: 'No slide down the fire pole',
      user_ids: [ '3' ],
    },
  ]
}
function makeEventsArray() {
  return [
    {
      id: 1,
      announcements: 'No announcements',
      needed_items: ['chips', 'quac', 'queso'],
      event_date: 'july 25th',
      event_time: '9pm',
      lesson_title: '#1 - God Created the World',
      bible_passage: 'Genesis 1:1-2:3',
      question: ['What grabbed your attention?','What did you like/dislike about the passage?','What does this passage say about God/people?','How can you apply this passage to your life?'],
      event_leader: 1,
      group_event: 2,
    },
    {
      id: 2,
      announcements: 'few announcements',
      needed_items: ['chips', 'tortillas', 'queso'],
      event_date: 'August 1st',
      event_time: 'noon',
      lesson_title: '#2 - The Creation of Man',
      bible_passage: 'Genesis 2:4-25',
      question: ['What grabbed your attention?','What did you like/dislike about the passage?','What does this passage say about God/people?','How can you apply this passage to your life?'],
      event_leader: 2,
      group_event: 3,
    },
    {
      id: 3,
      announcements: 'Little announcements',
      needed_items: ['chips', 'fajitas', 'queso'],
      event_date: 'September 19th',
      event_time: '9am',
      lesson_title: '#3 - First Sin',
      bible_passage: 'Genesis 3:1-24',
      question: ['What grabbed your attention?','What did you like/dislike about the passage?','What does this passage say about God/people?','How can you apply this passage to your life?'],
      event_leader: 3,
      group_event: 1,
    },
  ]
}
module.exports = {
  makeUsersArray,
  makeGroupsArray,
  makeEventsArray
}