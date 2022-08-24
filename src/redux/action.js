import * as actions from "./actionTypes"

const setMode = mode => {
    return {
        type: 'SET_MODE',
        payload: mode
    }
}
const setUser = (users) => {
    return {
        type: actions.USERS_SET,
        payload: users
    }
}
const setFeedbacks = (feedbacks) => {
    return {
        type: actions.FEEDBACK_SET,
        payload: feedbacks
    }
}

const setComments = (comments) => {
    return {
        type: actions.COMMENT_SET,
        payload: comments
    }
}

const setNotifications = (notifications) => {
    return {
        type: actions.NOTIFICATION_SET,
        payload: notifications
    }
}

const editUser = (editUser) => {
    return {
        type: actions.USERS_EDIT,
        payload: editUser
    }
}
const editFeedback = (newFeedback) => {
    return {
        type: actions.FEEDBACK_EDIT,
        payload: newFeedback
    }
}
const editNotification = (newNotification) => {
    return {
        type: actions.NOTIFICATION_EDIT,
        payload: newNotification
    }
}
const addPost = newPost => {
    return {
        type: actions.POSTS_ADD,
        payload: newPost
    }
}
const addUser = newUser => {
    return {
        type: actions.USERS_ADD,
        payload: newUser
    }
}
const addNotification = newNotification => {
    return {
        type: actions.NOTIFICATION_ADD,
        payload: newNotification
    }
}

const deleteUser = (id) => {
    return {
        type: actions.USERS_DELETE,
        payload: id
    }
}
const deleteFeedback = (id) => {
    return {
        type: actions.FEEDBACK_DELETE,
        payload: id
    }
}

const deleteComment = (id) => {
    return {
        type: actions.COMMENT_DELETE,
        payload: id
    }
}

const deleteNotification = (id) => {
    return {
        type: actions.NOTIFICATION_DELETE,
        payload: id
    }
}

const exportDefault = {
    setMode,
    addPost,
    setUser,
    addUser,
    editUser,
    deleteUser,
    deleteFeedback,
    setFeedbacks,
    editFeedback,
    setComments,
    deleteComment,
    addNotification,
    setNotifications,
    deleteNotification,
    editNotification
}

export default exportDefault