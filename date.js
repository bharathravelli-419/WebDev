

getDate =()=>{
    const today = new Date();
    const options = {
        weekday: 'long',       
        month:'long',
        day:'numeric',
       
      };

    const formatted = today.toLocaleDateString("en-US",options);
    return formatted;
}
module.exports = {getDate};