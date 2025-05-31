import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Here you would typically fetch data from your database
    // This is example data - replace with your actual database queries
    const stats = {
      totalTrips: 25,
      totalBookings: 150,
      totalRevenue: 15000,
      activeUsers: 45,
      totalOffers: 100,
      validatedOffers: 75,
      pendingOffers: 25
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
} 