import { JSONObjectsReader, writeToFile } from "./Utils"
import { Customer, Building } from "./Entities";

export async function main(): Promise<void> {
    const customers = new JSONObjectsReader<Customer>("./resources/customers.txt");
    const office = new Building("53.339428", "-6.257664");
    const radius = 100e3; // 100 km

    const selectedCustomers: Customer[] = [];

    return customers
        .forEach(customer => {
            if (office.distance(customer) <= radius) selectedCustomers.push(customer)
        }).then(() =>
            writeToFile(
                "output.txt",
                selectedCustomers
                    .sort((customer1, customer2) => customer1.user_id - customer2.user_id)
                    .map(customer => `${customer.name}: ${customer.user_id}`)
                    .join("\n")
            )
        );
}
