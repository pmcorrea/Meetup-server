let user = `
{
	user(id: 1) {
		id
		user_first_name
		user_last_name
		user_email
		user_password
		user_zipcode
		user_employer
		user_employer_address
		user_no_of_followers
		user_status
		user_avatar
		user_bio
	}
}
`;

let participants = `
{
	participants(eventId: 1) {
		user {
			id
			user_first_name
			user_last_name
			user_email
			user_password
			user_zipcode
			user_employer
			user_employer_address
			user_no_of_followers
			user_status
			user_avatar
			user_bio
		}

		event {
			id
			event_name
			event_description
			event_location_name
			event_address 
			event_date 
			event_time 
			event_host_id
			event_no_of_participants
			event_cover_img
		}
	}
}
`;

let event = `
{
	event(id: 1) {
		id
		event_name
		event_description
		event_location_name
		event_address 
		event_date 
		event_time 
		event_host_id
		event_no_of_participants
		event_cover_img
	}
}
`;

let invites = `
{
	invites {
		id
		event_id
		user_id
		sender_id
	}
}
`;

let bookmarksByUserId = `
{
	bookmarksByUserId(userId: 1) {
		event {
			id
		event_name
		event_description
		event_location_name
		event_address 
		event_date 
		event_time 
		event_host_id
		event_no_of_participants
		event_cover_img
		}

		user {
			id
			user_first_name
			user_last_name
			user_email
			user_password
			user_zipcode
			user_employer
			user_employer_address
			user_no_of_followers
			user_status
			user_avatar
			user_bio
		}
	}
}
`;

let eventsByHost = `
	{
		eventsByHost(id: 1) {

				id
				event_name
				event_description
				event_location_name
				event_address 
				event_date 
				event_time 
				event_host_id
				event_no_of_participants
				event_cover_img

		}
	}
`;

let invitesByUserId = `
	{
		invitesByUserId(userId: 1) {
			event {
				id
				event_name
				event_description
				event_location_name
				event_address 
				event_date 
				event_time 
				event_host_id
				event_no_of_participants
				event_cover_img
			}

			user {
				id
				user_first_name
				user_last_name
				user_email
				user_password
				user_zipcode
				user_employer
				user_employer_address
				user_no_of_followers
				user_status
				user_avatar
				user_bio
			}
		}
	}
`;

let invitesByEventId = `
	{
		invitesByEventId(eventId: 1) {
			event {
				id
				event_name
				event_description
				event_location_name
				event_address 
				event_date 
				event_time 
				event_host_id
				event_no_of_participants
				event_cover_img
			}

			user {
				id
				user_first_name
				user_last_name
				user_email
				user_password
				user_zipcode
				user_employer
				user_employer_address
				user_no_of_followers
				user_status
				user_avatar
				user_bio
			}
		}
	}
`;

module.exports = {
	user,
	participants,
	event,
	invites,
	bookmarksByUserId,
	eventsByHost,
	invitesByUserId,
	invitesByEventId,
};
