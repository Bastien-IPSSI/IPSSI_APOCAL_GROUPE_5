"""Admin Django pour l'app accounts."""

from django.contrib import admin

from .models import DataRequest


@admin.register(DataRequest)
class DataRequestAdmin(admin.ModelAdmin):
    """Audit trail RGPD (perturbation J3-bis) — consultable par le DPO."""

    list_display = (
        "created_at",
        "requester_email_snapshot",
        "request_type",
        "status",
        "format_requested",
        "ip_address",
    )
    list_filter = ("status", "request_type", "format_requested")
    search_fields = ("requester_email_snapshot", "ip_address")
    readonly_fields = (
        "requester",
        "requester_email_snapshot",
        "request_type",
        "ip_address",
        "format_requested",
        "file_hash",
        "created_at",
        "responded_at",
    )
    date_hierarchy = "created_at"
