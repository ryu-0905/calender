'use strict'
{
  console.clear();

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  
  const dates = [];
  function set(year, month){
    while(dates[0]){
      dates.shift();
    }

    const p_d = [];
    const p_last = new Date(year, month, 0).getDate();
    if(new Date(year, month, 0).getDay() !== 6){
      for(let i=p_last-new Date(year, month, 0).getDay();i<=p_last;i++){
        p_d.push({
          date: i,
          iftoday: false,
          ifdiappear: true,
        });
      }
    }

    const d = [];
    const last = new Date(year, month+1, 0).getDate();
    for(let i=1;i<=last;i++){
      d.push({
        date: i,
        iftoday: false,
        ifdiappear: false,
      });
      if(year === new Date().getFullYear() && month === new Date().getMonth()){
        if(d[i-1].date === date){
          d[i-1].iftoday = true;
        }
      }
    }

    const n_d = [];
    if(new Date(year, month+1, 1).getDay() !== 0){
      for(let i=1;i<=7-new Date(year, month+1, 1).getDay();i++){
        n_d.push({
          date: i,
          iftoday: false,
          ifdiappear: true,
        });
      }
    }

    dates.push(...p_d, ...d, ...n_d);
    console.log(dates);
  }

  function display(year, month) {
    set(year, month);

    document.getElementById('month').textContent = `${year}/${String(month+1).padStart(2,'0')}`;

    const tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    for(let i=0;i<5;i++){
      const tr = document.createElement('tr');
      for(let j=0;j<7;j++){
        const td = document.createElement('td');
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }

    for(let i=0;i<35;i++){
      document.querySelectorAll('td')[i].textContent = dates[i].date;
      if(dates[i].ifdiappear){
        document.querySelectorAll('td')[i].classList.add('disappear');
      }
      if(dates[i].iftoday){
        document.querySelectorAll('td')[i].classList.add('today');
      }
    }
  }

  function main() {
    display(year, month);
    
    let y = year;
    let m = month;
    document.getElementById('previous_y').addEventListener('click', () => {
      y--;
      display(y, m);
    });
    document.getElementById('previous_m').addEventListener('click', () => {
      m--;
      if(m<0){
        y--;
        m = 11;
      }
      display(y, m);
    });
    document.getElementById('next_m').addEventListener('click', () => {
      m++;
      if(11<m){
        y++;
        m = 0;
      }
      display(y, m);
    });
    document.getElementById('next_y').addEventListener('click', () => {
      y++;
      display(y, m);
    });
    document.getElementById('today').addEventListener('click', () => {
      y = year;
      m = month;
      display(year, month);
    });
  }
  main();
}
