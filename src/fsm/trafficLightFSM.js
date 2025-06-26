const trafficLightFSM = {
  red: { duration: 5, next: 'green' },
  green: { duration: 4, next: 'yellow' },
  yellow: { duration: 2, next: 'red' },
};

export default trafficLightFSM;