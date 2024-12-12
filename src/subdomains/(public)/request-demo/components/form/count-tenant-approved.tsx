'use client';

import { useEffect,useState } from 'react';

import { formatDate } from '@/shared/modules/utils/format-date';

import { getApprovedTenantsCount } from '../../actions/get-request-demo';

export const CountTenantApproved = () => {
  const [approvedCount, setApprovedCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        const count = await getApprovedTenantsCount();
        setApprovedCount(count);
      } catch (error) {
        console.error('Error fetching approved tenants count:', error);
      }
    };

    fetchApprovedCount();
  }, []);

  return (
    <div className="mt-8 text-center">
      <p className="mb-2 text-5xl font-bold">
        {approvedCount !== null ? approvedCount : '...'}
      </p>
      <p className="text-xl">Demonstrações em andamento</p>
      <p className="text-xs text-zinc-500">{formatDate(new Date())}</p>
    </div>
  );
};
