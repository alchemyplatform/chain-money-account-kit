# ChainMoney

A peer-to-peer payment application built with Next.js, Alchemy Account Kit, and AAVE Protocol. Send USDC payments to other users while optionally earning yield on your balance.

## Features

- **Smart Account Wallet**: Powered by [Alchemy Account Kit](https://accountkit.alchemy.com/) with email-based authentication
- **Instant P2P Payments**: Send USDC to other users on the platform
- **Yield Earning**: Automatically earn interest on your balance through [AAVE Protocol](https://aave.com/)
- **Intelligent Token Conversion**: Automatically converts between USDC and aUSDC based on recipient preferences
- **Gas Sponsorship**: All transactions are gasless thanks to Alchemy's gas sponsorship
- **Activity Feed**: View all platform transactions in real-time
- **Transaction History**: Track all your sent and received payments

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Smart Accounts**: [Alchemy Account Kit](https://accountkit.alchemy.com/)
- **DeFi Protocol**: [AAVE V3](https://aave.com/)
- **Network**: Base Sepolia (testnet)

## Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- Alchemy account with API key and Gas Policy ID
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/alchemyplatform/chain-money-account-kit.git
cd chain-money-account-kit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update the values:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@host:port/database

# Alchemy Configuration
ALCHEMY_API_KEY=your-alchemy-api-key
ALCHEMY_POLICY_ID=your-alchemy-gas-policy-id
```

#### Getting Alchemy Credentials

1. Sign up at [Alchemy Dashboard](https://dashboard.alchemy.com/)
2. Create a new app on **Base Sepolia** network
3. Get your API key from the app dashboard
4. Create a Gas Policy:
   - Navigate to Account Kit → Gas Manager
   - Create a new policy for Base Sepolia
   - Copy the Policy ID

### 4. Set up the database

Run the database migrations:

```bash
npm run db:push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## How It Works

### Smart Account Authentication

Users authenticate via email using Alchemy Account Kit, which creates a smart contract wallet for each user. No seed phrases or private keys needed!

### Payment Flow with Yield Conversion

The app intelligently handles different token preferences:

1. **Check balances**: Sender's USDC and aUSDC balances are checked
2. **Determine token**: Based on recipient's yield preference (earning or not)
3. **Convert if needed**:
   - If recipient wants yield but sender has USDC → Convert to aUSDC via AAVE
   - If recipient doesn't want yield but sender has aUSDC → Withdraw from AAVE to USDC
4. **Send payment**: Transfer the correct token in a single atomic transaction

All operations (approve, supply/withdraw, transfer) are batched together for efficiency.

### Yield Earning

When yield earning is enabled on the `/wallet` page:
- USDC is deposited into AAVE Protocol
- User receives aUSDC (interest-bearing tokens)
- Balance automatically grows over time
- Can be withdrawn at any time

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   ├── profile/       # User profile management
│   │   ├── rpc/           # Alchemy RPC proxy
│   │   ├── transactions/  # Transaction recording
│   │   └── users/         # User listing
│   ├── send-payment/      # Payment sending page
│   ├── wallet/            # Wallet management page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── contexts/              # React contexts
│   ├── smart-account-context.tsx  # Account Kit integration
│   └── user-context.tsx   # User profile state
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   ├── aave-abis.ts      # AAVE contract ABIs
│   ├── account-kit-config.ts  # Account Kit setup
│   └── constants.ts       # Contract addresses
└── src/
    └── db/               # Database configuration
        └── schema.ts     # Drizzle schema
```

## Key Smart Contracts (Base Sepolia)

- **USDC**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **aUSDC**: `0xf53B60F4006cab2b3C4688ce41fD5362427A2A66`
- **AAVE V3 Pool**: `0x07eA79F68B2B3df564D0A34F8e19D9B1e339814b`

## Development

### Database Changes

After modifying `src/db/schema.ts`, push changes to the database:

```bash
npm run db:push
```

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## Testing with Testnet Funds

1. Navigate to the Wallet page
2. Copy your smart account address
3. Get test USDC from [Circle Faucet](https://faucet.circle.com/)
   - Select **Base Sepolia** network
   - Paste your address
   - Request 10 USDC

## Deployment

This app can be deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Make sure to add all environment variables from `.env.example` to your Vercel project settings.

## Learn More

- [Alchemy Account Kit Documentation](https://accountkit.alchemy.com/docs)
- [AAVE V3 Documentation](https://docs.aave.com/developers/getting-started/readme)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)

## License

MIT
