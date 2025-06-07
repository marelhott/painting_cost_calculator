// supabase/functions/send-order-email/index.ts
import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  // ✅ CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }
  
  try {
    const orderData = await req.json();
    
    // Prepare email content
    const emailSubject = `Nová poptávka na malířské práce - ${orderData.customer_name || 'Neznámý zákazník'}`;
    
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #1a365d; margin-bottom: 30px; border-bottom: 3px solid #fbbf24; padding-bottom: 15px;">Nová poptávka na malířské práce</h1>
          
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2d3748; font-size: 18px; margin-bottom: 15px;">📋 Základní informace</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 40%;">Odhadovaná cena:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #d69e2e; font-weight: bold; font-size: 18px;">${formatCurrency(orderData.calculated_cost || 0)}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Typ povrchu:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.surface_type === 'floor' ? 'Podlaha' : orderData.surface_type === 'wall' ? 'Stěna' : 'Neurčeno'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Celková plocha:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.total_area || 'Neurčeno'} m²</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Typ prostoru:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${getSpaceTypeLabel(orderData.space_type)}</td></tr>
              ${orderData.room_count ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Počet místností:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.room_count}</td></tr>` : ''}
              ${orderData.ceiling_height ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Výška stropu:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.ceiling_height} cm</td></tr>` : ''}
            </table>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2d3748; font-size: 18px; margin-bottom: 15px;">👤 Kontaktní údaje</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 30%;">Jméno:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.customer_name || 'Neuvedeno'}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${orderData.email}" style="color: #3182ce;">${orderData.email}</a></td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Telefon:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${orderData.phone}" style="color: #3182ce;">${orderData.phone}</a></td></tr>
              ${orderData.address ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Adresa:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.address}</td></tr>` : ''}
            </table>
          </div>
          
          ${orderData.repair_level || orderData.paint_provision || orderData.furniture_handling || orderData.empty_space || orderData.carpet_presence ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2d3748; font-size: 18px; margin-bottom: 15px;">🔧 Preference služeb</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${orderData.repair_level ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 50%;">Úroveň oprav:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${getRepairLevelLabel(orderData.repair_level)}</td></tr>` : ''}
              ${orderData.paint_provision ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Dodáváme barvu:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.paint_provision === 'yes' ? 'Ano' : 'Ne'}</td></tr>` : ''}
              ${orderData.furniture_handling ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Posouvání nábytku:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.furniture_handling === 'yes' ? 'Ano' : 'Ne'}</td></tr>` : ''}
              ${orderData.empty_space ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Prázdný prostor:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.empty_space === 'yes' ? 'Ano' : 'Ne'}</td></tr>` : ''}
              ${orderData.carpet_presence ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Koberec v prostoru:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${orderData.carpet_presence === 'yes' ? 'Ano' : 'Ne'}</td></tr>` : ''}
            </table>
          </div>
          ` : ''}
          
          ${orderData.preferred_date ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2d3748; font-size: 18px; margin-bottom: 15px;">📅 Termín</h2>
            <p style="padding: 10px; background-color: #f7fafc; border-left: 4px solid #fbbf24; margin: 0;"><strong>Preferovaný termín:</strong> ${orderData.preferred_date}</p>
          </div>
          ` : ''}
          
          ${orderData.additional_info ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #2d3748; font-size: 18px; margin-bottom: 15px;">💬 Dodatečné informace</h2>
            <p style="padding: 15px; background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 5px; margin: 0; line-height: 1.6;">${orderData.additional_info}</p>
          </div>
          ` : ''}
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 30px;">
            <p style="margin: 0; color: #4a5568; font-size: 14px; text-align: center;">
              <strong>Poptávka byla odeslána:</strong> ${new Date(orderData.created_at).toLocaleString('cs-CZ')}<br>
              <strong>ID objednávky:</strong> ${orderData.order_id || 'Neznámé'}
            </p>
          </div>
        </div>
      </div>
    `;
    
    function getSpaceTypeLabel(spaceType) {
      const labels = {
        'room': 'Místnost',
        'apartment': 'Byt',
        'house': 'Dům',
        'common-areas': 'Společné prostory',
        'office': 'Kancelář',
        'pension-hotel': 'Penzion/Hotel',
        'commercial': 'Komerční prostor'
      };
      return labels[spaceType] || 'Neurčeno';
    }
    
    function getRepairLevelLabel(repairLevel) {
      const labels = {
        'none': 'Žádné opravy',
        'small': 'Malé opravy',
        'medium': 'Střední opravy',
        'large': 'Velké opravy'
      };
      return labels[repairLevel] || 'Neurčeno';
    }
    
    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['info@malirivcernem.cz'],
        subject: emailSubject,
        html: emailContent
      })
    });
    
    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      throw new Error(`Email sending failed: ${errorData}`);
    }
    
    const emailResult = await resendResponse.json();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Email byl úspěšně odeslán',
      email_id: emailResult.id
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
});