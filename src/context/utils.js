const paginate = (data) => {
    const itemsPerPage = 10
    const newTasks = data.reduce((rows, key, index) => (index % itemsPerPage === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, []);
    return newTasks
  }
  
export default paginate