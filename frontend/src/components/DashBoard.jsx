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
        <h2 className="text-xl font-bold mb-4 text-center">Your Documents</h2>
        <Slider cards={docs} />
    </div>
);
};

export default Dashboard;
