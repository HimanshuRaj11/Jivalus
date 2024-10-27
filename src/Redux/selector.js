import { createSelector } from 'reselect';

// 1. Simple selectors for each slice
const selectUser = (state) => state.User;
const selectSuggestedUsers = (state) => state.suggestedUsers;
const selectPosts = (state) => state.Posts;

// 2. Memoized selector for processed user data
export const selectProcessedUsers = createSelector(
    [selectUser],
    (user) => {
        // Assuming user data needs some processing (e.g., adding flags)
        // return { ...user, isActive: user.status === 'active' };
        return user
    }
);

// 3. Memoized selector for suggested users
export const selectProcessedSuggestedUsers = createSelector(
    [selectSuggestedUsers],
    (suggestedUsers) => {
        // Process suggested users, e.g., filtering or sorting
        // return suggestedUsers.filter(user => user.isRecommended);
        return suggestedUsers
    }
);

// 4. Memoized selector for posts (example of sorting posts by date)
export const selectSortedPosts = createSelector(
    [selectPosts],
    (posts) => {
        // return posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        return posts
    }
);
