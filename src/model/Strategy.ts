export class Strategy {
    name: string;
    address: string;
    balance: string;
    tvl: string;
    isApproved: boolean;
    isStreaming: boolean;

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
        this.balance = "";
        this.tvl = "";
        this.isApproved = false;
        this.isStreaming = false;
    }
}
