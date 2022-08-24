import * as actions from "./actionTypes";

// const [data, loader] = useFetchData(
//     "https://625bdd6a50128c570208770d.mockapi.io/adv"
//   );
const initState = {
  notifications: {
    listNotification: [],
    loading: false,
  },
  comments: {
    listComment: [],
    loading: false,
  },
  users: {
    listUser: [],
    loading: false,
  },
  feedbacks: {
    listFeedback: [],
    loading: false,
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.POSTS_ADD:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case actions.USERS_SET:
      return {
        ...state,
        users: {
          loading: false,
          listUser: action.payload,
        },
      };
    case actions.USERS_ADD:
      return {
        ...state,
        users: {
          loading: true,
          listUser: [...state.users.listUser, action.payload],
        },
      };
    case actions.USERS_DELETE:
      return {
        ...state,
        users: {
          loading: true,
          listUser: state.users.listUser.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    case actions.USERS_EDIT:
      const editUser = action.payload;
      // console.log(action.payload);
      const userIndex = state.users.listUser.findIndex(
        (user) => user.id === editUser.id
      );
      if (userIndex >= 0) {
        state.users.listUser[userIndex] = editUser;
      }
      return {
        ...state,
        users: {
          loading: true,
          listUser: state.users.listUser,
        },
      };
    case actions.FEEDBACK_SET:
      return {
        ...state,
        feedbacks: {
          loading: false,
          listFeedback: action.payload,
        },
      };
    case actions.FEEDBACK_DELETE:
      return {
        ...state,
        feedbacks: {
          loading: true,
          listFeedback: state.feedbacks.listFeedback.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    case actions.FEEDBACK_EDIT:
      const editFeedback = action.payload;
      // console.log(action.payload);
      const feedbackIndex = state.feedbacks.listFeedback.findIndex(
        (feedback) => feedback.id === editFeedback.id
      );
      if (feedbackIndex >= 0) {
        state.feedbacks.listFeedback[feedbackIndex] = editFeedback;
      }
      return {
        ...state,
        feedbacks: {
          loading: true,
          listFeedback: state.feedbacks.listFeedback,
        },
      };
    case actions.COMMENT_SET:
      return {
        ...state,
        comments: {
          loading: false,
          listComment: action.payload,
        },
      };
    case actions.COMMENT_DELETE:
      return {
        ...state,
        comments: {
          loading: true,
          listComment: state.comments.listComment.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    case actions.NOTIFICATION_SET:
      return {
        ...state,
        notifications: {
          loading: false,
          listNotification: action.payload,
        },
      };
    case actions.NOTIFICATION_ADD:
      return {
        ...state,
        notifications: {
          loading: true,
          listNotification: [...state.notifications.listNotification, action.payload],
        },
      };
    case actions.NOTIFICATION_DELETE:
      return {
        ...state,
        notifications: {
          loading: true,
          listNotification: state.notifications.listNotification.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    case actions.NOTIFICATION_EDIT:
      const editNotification = action.payload;
      // console.log(action.payload);
      const notificationIndex = state.notifications.listNotification.findIndex(
        (notification) => notification.id === editNotification.id
      );
      if (notificationIndex >= 0) {
        state.notifications.listNotification[userIndex] = editNotification;
      }
      return {
        ...state,
        notifications: {
          loading: true,
          listNotification: state.notifications.listNotification,
        },
      };
    default:
      return state;
  }
};

export default reducer;
