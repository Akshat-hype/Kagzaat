import Slider from '../components/Slider';

const Dashboard = () => {
  const docs = [
    { title: 'Aadhar Card' },
    { title: 'PAN Card' },
    { title: 'Driving License' },
    { title: 'Passport' },
    { title: 'Birth Certificate' },
    { title: '10th Marksheet' },
    { title: '12th Marksheet' },
    { title: 'Voter ID' },
    { title: 'Ration Card' },
    { title: 'Electric Bill' },
  ];

  return (
    <div className="p-6">
       <div className="flex items-center my-6">
      <div className="flex-grow h-1 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
      <h2 className="mx-4 text-xl font-bold text-black">Your Documents</h2>
      <div className="flex-grow h-1 bg-gradient-to-r from-transparent via-blue-950 to-transparent" />
    </div>
      <div className="max-w-screen-lg mx-auto">
        <Slider cards={docs} />
      </div>
    </div>
  );
};

export default Dashboard;
