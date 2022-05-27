const ZERO = 0;
const ONE_HUNDRED = 100;

const getCompletedHabitsAmount = todayHabits => todayHabits.reduce((acc, habit) => habit.done ? ++acc : acc, ZERO);

const getCompletedHabitsPercentage = todayHabits => parseInt(getCompletedHabitsAmount(todayHabits) / todayHabits.length * ONE_HUNDRED);

export default getCompletedHabitsPercentage;
