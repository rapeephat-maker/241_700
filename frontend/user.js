//1 โหลดตัว user ทั้งหมด จาก เส้นapi  http://localhost:8000/users
//2 นำuser ที่ได้มาแสดงในหน้าเว็บ ในhtml
const Base_url = 'http://localhost:8000';
window.onload =async ()=>{
    await loadData();
}
const loadData = async()=>{
    const response = await axios.get(`${Base_url}/users`); //แสดงข้อมูลจากserver
    console.log(response.data); 
    const usersDom = document.getElementById('user');
    let htmldata = '<div>'
    for(let i =0; i< response.data.length;i++){
        let user = response.data[i]; //ดึงข้อมูลuserแต่ละตัวมาแสดง
        htmldata += `<div>
        ${user.id} ${user.firstname} ${user.lastname} 
        <a href="index.html?id=${user.id}"><button>Edit</button></a>
        <button class='delete' data-id='${user.id}'>Delete</button>
        </div>`
    }
    htmldata += '</div>'
    usersDom.innerHTML = htmldata;

    const deleteDoms = document.getElementsByClassName('delete');
    for(let i =0; i<deleteDoms.length;i++){
        deleteDoms[i].addEventListener('click',async (event)=>{
            const id = event.target.dataset.id;
         try{
                await axios.delete(`${Base_url}/users/${id}`);
                loadData();
            }catch(error){
                console.error("Error deleting user:", error);
            }    
        });
    }
}