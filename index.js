// Your code here
function createEmployeeRecord(employee) {
  return {
  firstName: employee[0],   // first name to be the first index[0]
  familyName: employee[1],   // family name to be the second index[1]
  title: employee[2],      // name to be the third index[2]
  payPerHour: employee[3],  // payPerHour to be the fourth index [3]
  timeInEvents: [],   // timeInEvents to be an empty array
  timeOutEvents: []   // timeoutEvents to be an empty array
}
}

// function to make an array out of the created employee record array above
function createEmployeeRecords(employee) {
  return employee.map(createEmployeeRecord);  
}

// function to create an array of that splits the date and hour adds it to the employee record as a new object
function createTimeInEvent(employee, timeStamp) {
  let [date, hour] = timeStamp.split(' ');
 
  employee.timeInEvents.push({
  type: "TimeIn",
  hour: parseInt(hour, 10),
  date: date
  });  
  return employee;
}
console.log(createTimeInEvent());

// function to create an array of that splits the date and hour adds it to the employee record as a new object with properties
function createTimeOutEvent(employee, timeStamp) {
  let [date, hour] = timeStamp.split(' ');
  
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  
  return employee;
}  

// function to calculate hours worked
function hoursWorkedOnDate(employee, date) {
 let timeIn = employee.timeInEvents.find(event => event.date === date);   //get the time in value from employee array
 let timeOut = employee.timeOutEvents.find(event => event.date === date);  //get the time out value from employee array

 return (timeOut.hour - timeIn.hour) / 60;   // subtract the values and divide by 60 
}

// function to calculate wages earned for each employee on a date 
function wagesEarnedOnDate(employee, date) {  // extract employee details on a date
  let hoursWorked = hoursWorkedOnDate(employee, date);  // calculate hours worked
  return hoursWorked * employee.payPerHour;  // calculate wages earned
}

// function to calculate all wages earned for each employee on a date
function allWagesFor(employee) {
   const dates = employee.timeInEvents.map(event => event.date);
   const wages = dates.map(date => wagesEarnedOnDate(employee, date));
   const totalWages = wages.reduce((acc, curr) => acc + curr, 0);
   return totalWages;
}

// function to calculate wages earned for all employee 
function calculatePayroll(employee) {
  const allWages = employee.map(record => allWagesFor(record));
  const totalPayroll = allWages.reduce((acc, curr) => acc + curr, 0);
  return totalPayroll;
}