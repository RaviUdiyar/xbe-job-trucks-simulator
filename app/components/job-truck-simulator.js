import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class JobTruckSimulatorComponent extends Component {
  @tracked jobProductionCapacity = 1;
  @tracked jobProductionRate = 1;
  @tracked currentJobProductionRate = 0;
  @tracked jobProductionTime = 1;
  @tracked trucksAvailable = 0;
  @tracked trucksCapacity = 1;
  @tracked trucksLoadTime = 1;
  @tracked trucksDriveTime = 1;
  @tracked trucksUnloadTime = 1;
  @tracked trucksBreakdowns = 0;
  @tracked trucksBreakdownDuration = 0;
  @tracked minRequiredTrucks = 0;
  @tracked additionalRequiredTrucks = 0;

  get trucksCycleTime() {
    return (
      parseInt(this.trucksLoadTime) +
      2 * parseInt(this.trucksDriveTime) +
      parseInt(this.trucksUnloadTime)
    );
  }

  get trucks() {
    return {
      capacity: parseInt(this.trucksCapacity),
      loadTime: parseInt(this.trucksLoadTime),
      driveTime: parseInt(this.trucksDriveTime),
      unloadTime: parseInt(this.trucksUnloadTime),
      breakdowns: parseInt(this.trucksBreakdowns),
      breakdownDuration: parseInt(this.trucksBreakdownDuration),
      cycleTime: this.trucksCycleTime,
    };
  }

  get job() {
    return {
      productionCapacity: parseInt(this.jobProductionCapacity),
      productionRate: parseInt(this.jobProductionRate) * 60,
      totalProductionTime: parseInt(this.jobProductionTime) * 60,
    };
  }

  get calculateTrucksRequired() {
    let i = 0,
      currentRate = 0,
      minRequiredTrucks = 0;
    while (i <= this.job.totalProductionTime) {
      currentRate =
        this.job.productionCapacity - this.requiredTrucks.currentTrucksCapacity;
      if (currentRate > 0) {
        break;
      }
      i += this.job.productionRate;
    }
    minRequiredTrucks =
      this.requiredTrucks.currentTrucksCapacity / this.trucks.capacity;
    this.additionalRequiredTrucks = this.requiredTrucks.additionalRequiredTrucks;
    minRequiredTrucks =
      minRequiredTrucks > 0 ? Math.round(minRequiredTrucks) : 0;
    return {
      minRequiredTrucks,
    };
  }

  get requiredTrucks() {
    let trucksCycleTime = this.trucks.cycleTime,
      i = 0,
      breakdowns = this.trucks.breakdowns,
      jobProductionRate = this.job.productionRate,
      currentTrucksCapacity = 0,
      additionalRequiredTrucks = 0;

    while (i <= jobProductionRate) {
      if (breakdowns > 0 && i < this.trucks.breakdownDuration) {
        additionalRequiredTrucks += 1;
        breakdowns -= 1;
      } else {
        currentTrucksCapacity += this.trucks.capacity;
      }
      if (currentTrucksCapacity >= this.jobProductionCapacity) break;
      i += trucksCycleTime;
    }
    return {
      currentTrucksCapacity,
      additionalRequiredTrucks,
    };
  }
}
