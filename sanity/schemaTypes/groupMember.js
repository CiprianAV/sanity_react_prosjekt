export default {
    name: 'groupMember',
    title: 'Group Member',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Profile Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'bio',
        title: 'Biography',
        type: 'text',
      },
      {
        name: 'interests',
        title: 'Interests',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'logEntries',
        title: 'Log Entries',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'date', title: 'Date', type: 'datetime' },
              { name: 'entry', title: 'Entry', type: 'text' },
            ],
          },
        ],
      },
    ],
  };
  