import { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    let selecteCard = localStorage.getItem('selected_card');
    if (selecteCard != null && selecteCard != '') {
      console.log(selecteCard);
    }
  });
  return (
    <main>
      <header className="comp-header">
        <i className="bx bx-home-alt icon"></i>
        <i className="bx bx-chevron-right icon-right"></i>
        <span>Dashboard</span>
      </header>
      <section>selected card based on localstorage, stats etc</section>
    </main>
  );
};
export default Dashboard;
