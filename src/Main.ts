import { JSONObjectsReader, writeToFile } from "./Utils"
import { Customer, Building } from "./Entities";

export async function main(): Promise<void> {
    const customers = new JSONObjectsReader<Customer>("./resources/customers.txt");
    const office = new Building("53.339428", "-6.257664");
    const radius = 100e3; // 100 km

    const matchingCustomers: Customer[] = [];

    await customers.forEach(customer => {
        if (office.distance(customer) <= radius) matchingCustomers.push(customer);
    });

    matchingCustomers.sort((customer1, customer2) => customer1.user_id - customer2.user_id);

    const output: string = matchingCustomers
        .map(customer => `${customer.name}: ${customer.user_id}`)
        .join("\n");

    return writeToFile("output.txt", output);
}
