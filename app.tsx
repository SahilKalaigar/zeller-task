// Define the possible products in the catalog 
const catalog = { 
    ipd: { sku: 'ipd', name: 'Super iPad', price: 549.99 }, 
    atv: { sku: 'atv', name: 'Apple TV', price: 109.50 }, 
    vga: { sku: 'vga', name: 'VGA adapter', price: 30.00 } 
}; 

// Checkout class that handles the scanning and total calculation
class Checkout { 
    private items: any[] = [];

    // Method to scan an item
    scan(item: any): void { 
        this.items.push(item); 
    } 
    
    // Total calculation logic with all rules inside this method
    total(): number { 
        let totalPrice = 0;

        // Apply 3 for 2 Apple TV rule (buy 3, pay for 2)
        const appleTVs = this.items.filter(item => item.sku === 'atv'); 
        const fullPriceAppleTVs = appleTVs.length - Math.floor(appleTVs.length / 3); 
        totalPrice += fullPriceAppleTVs * catalog.atv.price; 

        // Apply Super iPad bulk discount rule
        const ipads = this.items.filter(item => item.sku === 'ipd');
        const ipadCount = ipads.length;
        if (ipadCount > 4) {
            totalPrice += ipadCount * 499.99; // Discounted price for iPads
        } else {
            totalPrice += ipadCount * catalog.ipd.price; // Regular price for iPads
        }

        // Add the price of all items except Apple TV (like VGA adapter, etc.)
        const otherItems = this.items.filter(item => item.sku !== 'atv' && item.sku !== 'ipd');
        totalPrice += otherItems.reduce((sum, item) => sum + item.price, 0);

        return totalPrice; 
    } 
}

// Example Test Case 1: 3 Apple TVs and 1 VGA adapter 
const checkout1 = new Checkout();
checkout1.scan(catalog.atv); 
checkout1.scan(catalog.atv); 
checkout1.scan(catalog.atv); 
checkout1.scan(catalog.vga); 
console.log(checkout1.total()); 

// Example Test Case 2: 4 iPads and 2 Apple TVs
const checkout2 = new Checkout();
checkout2.scan(catalog.ipd);
checkout2.scan(catalog.ipd);
checkout2.scan(catalog.ipd);
checkout2.scan(catalog.ipd);
checkout2.scan(catalog.atv);
checkout2.scan(catalog.atv);
console.log(checkout2.total());

// Example Test Case 3: 5 iPads and 2 Apple TVs
const checkout3 = new Checkout();
checkout3.scan(catalog.ipd);
checkout3.scan(catalog.ipd);
checkout3.scan(catalog.ipd);
checkout3.scan(catalog.ipd);
checkout3.scan(catalog.ipd);
checkout3.scan(catalog.atv);
checkout3.scan(catalog.atv);
console.log(checkout3.total());
